import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err.response.data.error);
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

  return (
    <div>
      <h2>blogs</h2>

      {user === null && <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
      }
    
      {user && <div>
        <p>{user.name} logged in</p>

        <h3>All blogs:</h3>
        
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )
        }

        <h3>Blogs by {user.name}:</h3>
        {blogs.map(blog =>  blog.user.name === user.name ? <Blog key={blog.id} blog={blog} /> : null )}
        
        </div>
      }

    </div>
  )
}

export default App