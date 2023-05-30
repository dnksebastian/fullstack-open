import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userBlogs, setUserBlogs] = useState([])
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: ''
  })
 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

const loginForm = () => (
  <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>      
)

const addBlog = async (e) => {
  e.preventDefault()
  
  try {
    const addedBlog = await blogService.createBlog(newBlog)
    setBlogs(blogs.concat(addedBlog))
    setUserBlogs(userBlogs.concat(addedBlog))
    setNewBlog({
      title: '',
      author: '',
      url: '',
      likes: ''
    })

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
}

const newBlogForm = () => (
  <form onSubmit={addBlog}>
    <div>
    <span>title</span>
    <input value={newBlog.title} onChange={(e) => {setNewBlog({...newBlog, title: e.target.value})}}/>
    </div>
    <div>
    <span>author</span>
    <input value={newBlog.author} onChange={(e) => {setNewBlog({...newBlog, author: e.target.value})}}/>
    </div>
    <div>
    <span>url</span>
    <input value={newBlog.url} onChange={(e) => {setNewBlog({...newBlog, url: e.target.value})}}/>
    </div>
    <div>
    <span>likes</span>
    <input value={newBlog.likes} onChange={(e) => {setNewBlog({...newBlog, likes: e.target.value})}}/>
    </div>
    <button type='submit'>create</button>
  </form>
)

  return (
    <div>
      <h2>blogs</h2>
      <Notification type={notificationType} message={notificationMsg}/>

      {user === null && <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
      }
    
      {user && <div>
        <p>{user.name} logged in</p>
        <button onClick={() => { 
          window.localStorage.clear()
          setUser(null)}}>logout</button>

          <h2>create new</h2>
          {newBlogForm()}

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