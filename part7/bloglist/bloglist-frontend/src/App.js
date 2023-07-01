import { useState, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from 'react-router-dom'


import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import UsersInformation from './components/UsersInformation'
import Home from './components/Home'
import Blogs from './components/Blogs'
import User from './components/User'
import Blog from './components/Blog'

import userServices from './services/users'
import loginService from './services/login'
import { setToken } from './services/blogs'

import { useNotificationValue, useNotificationDispatch } from './NotificationsContext'
import { useUserValue, useUserDispatch } from './UserContext'

const App = () => {

  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData('blogs')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  let user = useUserValue()
  const userDispatch = useUserDispatch()

  const notifValue = useNotificationValue()
  const notifDispatch = useNotificationDispatch()


  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getUsers() {
      const fetchedUsers = await userServices.getAllUsers()
      setUsers(fetchedUsers)
    }
    getUsers()
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      userDispatch( { type: 'LOGIN', payload: currentUser })
      setToken(currentUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const newUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(newUser))
      userDispatch({ type: 'LOGIN', payload: newUser })
      setUsername('')
      setPassword('')
      setToken(newUser.token)
      notifDispatch({ type: 'SUCCESS', message: 'successfully logged in' })
    }
    catch(err){
      console.log(err)
      notifDispatch({ type: 'ERROR', message: 'could not log in' })
    }
  }

  return (
    <div className='app-container'>

      <h2>blogs</h2>
      {notifValue.message && <Notification />}

      {!user &&
      <Togglable buttonLabel='Log in' btnId='btn-showlogin'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </Togglable>
      }

      {user && <div className='logged-in'>
        <p>{user.name} logged in</p>
        <button onClick={() => {
          window.localStorage.clear()
          userDispatch({ type: 'LOGOUT' })
        }}>logout</button>

        <Router>

          <Routes>
            <Route path='/blogs/:id' element={<Blog blogs={blogs}/>} />
            <Route path='/blogs' element={user ? <Blogs /> : <Navigate replace to="/"/>}/>
            <Route path='/users/:id' element={<User users={users}/>} />
            <Route path='/users' element={user ? <UsersInformation /> : <Navigate replace to="/"/> }/>
            <Route path='/' element={<Home />}/>
          </Routes>

        </Router>

      </div>
      }

    </div>
  )
}

export default App