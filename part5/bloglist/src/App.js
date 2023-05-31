import { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userBlogs, setUserBlogs] = useState([])
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  
 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const blogFormRef = useRef()

  console.log('render');

  useEffect(() => {
    async function fetchBlogs() {
      const receivedBlogs = await blogService.getAll()
      setBlogs(receivedBlogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    async function fetchUserBlogs() {
      const loggedUser = window.localStorage.getItem('loggedBloglistUser')
      if(loggedUser) {
        const user = JSON.parse(loggedUser)
        const receivedUserBlogs = await blogService.getUserBlogs(user)
        setUserBlogs(receivedUserBlogs)
      }
    }
    fetchUserBlogs()
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch (err) {
      setNotificationMsg(err.response.data.error)
      setNotificationType('err')
      setTimeout(() => {
        setNotificationMsg(null)
        setNotificationType(null)
      }, 4000)
      // console.log(err.response.data.error);
  }
}

const addBlog = async (blogObj) => {
  
  try {
    const addedBlog = await blogService.createBlog(blogObj)
    setBlogs(blogs.concat(addedBlog))
    setUserBlogs(userBlogs.concat(addedBlog))
   
    setNotificationMsg(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
    setNotificationType('success')
    setTimeout(() => {
      setNotificationMsg(null)
      setNotificationType(null)
    }, 4000)

  } catch (err) {
    setNotificationMsg('Failed to add blog')
      setNotificationType('err')
      setTimeout(() => {
        setNotificationMsg(null)
        setNotificationType(null)
      }, 4000)
  }
  blogFormRef.current.toggleVisibility()
}


  return (
    <div>
      <h2>blogs</h2>
      <Notification type={notificationType} message={notificationMsg}/>

      {!user &&
      <Togglable buttonLabel='Log in'>
        <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
        />
      </Togglable>
      }
    
      {user && <div>
        <p>{user.name} logged in</p>
        <button onClick={() => { 
          window.localStorage.clear()
          setUser(null)}}>logout</button>

          <h2>create new</h2>

          <Togglable buttonLabel='new note' ref={blogFormRef}>
            <BlogForm
            createBlog={addBlog}
            />
          </Togglable>

        <h3>All blogs:</h3>
        
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}

        <h3>Blogs by {user.name}:</h3>

        {userBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}

      </div>
      }

    </div>
  )
}

export default App