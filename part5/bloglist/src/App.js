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

  console.log('render')

  async function fetchBlogs() {
    const receivedBlogs = await blogService.getAll()
    setBlogs(receivedBlogs)
  }

  useEffect(() => {
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

  async function fetchUserBlogs() {
    const loggedUser = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      const receivedUserBlogs = await blogService.getUserBlogs(user)
      setUserBlogs(receivedUserBlogs)
    }
  }

  useEffect(() => {
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
    }
  }

  const addBlog = async (blogObj) => {

    try {
      const addedBlog = await blogService.createBlog(blogObj)
      const extendedBlog = { ...addedBlog, username: user.name }
      setBlogs(blogs.concat(extendedBlog))
      setUserBlogs(userBlogs.concat(extendedBlog))

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

  const likeBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)

    const likedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const updatedBlog = await blogService.updateBlog(id, likedBlog)

      setBlogs(blogs.map(b => b.id !== id ? b : updatedBlog ))
      setUserBlogs(userBlogs.map(b => b.id !== id ? b : updatedBlog ))

      setNotificationMsg(`liked blog ${updatedBlog.title} by ${updatedBlog.author}`)
      setNotificationType('success')
      setTimeout(() => {
        setNotificationMsg(null)
        setNotificationType(null)
      }, 2000)
    }
    catch (err) {
      setNotificationMsg('Failed to like blog')
      setNotificationType('err')
      setTimeout(() => {
        setNotificationMsg(null)
        setNotificationType(null)
      }, 4000)
    }
  }

  const removeBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)

    let userConfirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if(userConfirmed) {
      try {
        await blogService.deleteBlog(id)
        fetchBlogs()
        fetchUserBlogs()

        setNotificationMsg(`removed blog ${blog.title} by ${blog.author}`)
        setNotificationType('success')
        setTimeout(() => {
          setNotificationMsg(null)
          setNotificationType(null)
        }, 2000)
      }
      catch(err){
        setNotificationMsg('Failed to remove blog')
        setNotificationType('err')
        setTimeout(() => {
          setNotificationMsg(null)
          setNotificationType(null)
        }, 4000)
      }
    }

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
          <Blog key={blog.id} blog={blog} handleLikes={likeBlog} user={user}/>
        )}

        <h3>Blogs by {user.name}:</h3>

        {userBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLikes={likeBlog} handleRemove={removeBlog} user={user}/>
        )}

      </div>
      }

    </div>
  )
}

export default App