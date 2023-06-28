import { useState, useEffect, useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import Notification from './components/Notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

// import blogService from './services/blogs'
import loginService from './services/login'

import { setToken, getAllBlogs, createNewBlog, updateBlog, deleteBlog } from './services/newblogs'

import { useNotificationValue, useNotificationDispatch } from './NotificationsContext'
import { useUserValue, useUserDispatch } from './UserContext'

const App = () => {
  const queryClient = useQueryClient()
  // const [blogs, setBlogs] = useState([])
  // const [userBlogs, setUserBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const notifValue = useNotificationValue()
  const notifDispatch = useNotificationDispatch()

  let user = useUserValue()
  const userDispatch = useUserDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      userDispatch( { type: 'LOGIN', payload: currentUser })
      setToken(currentUser.token)
    }
  }, [])

  const addNewBlogMutation = useMutation(createNewBlog, {
    onSuccess: (newBlog) => {
      // queryClient.invalidateQueries('blogs')
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
      notifDispatch({ type: 'SUCCESS', message: `a new blog ${newBlog.title} by ${newBlog.author} added` })
    },
    onError: () => {
      notifDispatch({ type: 'ERROR', message: 'Failed to add blog' })
    }
  })

  const updateBlogMutation = useMutation(updateBlog, {
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries('blogs')
      notifDispatch({ type: 'SUCCESS', message: `liked blog ${updatedBlog.title} by ${updatedBlog.author}` })
    },
    onError: () => {
      notifDispatch({ type: 'ERROR', message: 'Failed to like a blog' })
    }
  })

  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: (deletedBlog) => {
      queryClient.invalidateQueries('blogs')
      notifDispatch({ type: 'SUCCESS', message: `removed blog ${deletedBlog.title} by ${deletedBlog.author}` })
    },
    onError: () => {
      notifDispatch({ type: 'ERROR', message: 'Failed to remove a blog' })
    }
  })

  const blogsResult = useQuery('blogs', getAllBlogs, {
    refetchOnWindowFocus: false,
  })

  const sortBlogsByLikes = (blogsArr) => {
    if(blogsArr) {
      const sortedBlogs = blogsArr.sort((prev, next) => next.likes - prev.likes)
      return sortedBlogs
    }
  }

  const initialBlogs = blogsResult.data
  const blogs = sortBlogsByLikes(initialBlogs)
  let userBlogs = []

  if(blogs && user) {
    userBlogs = blogs.filter(b => b.user.username === user.username)
  }

  // async function fetchBlogs() {
  //   const receivedBlogs = await blogService.getAll()
  //   const sortBlogs = sortBlogsByLikes(receivedBlogs)
  //   setBlogs(sortBlogs)
  // }

  // useEffect(() => {
  //   fetchBlogs()
  // }, [])


  // if (user) {
  //   userBlogs = blogs.filter(b => b.user.username === user.username)
  //   console.log(blogs, userBlogs)
  //   console.log(user)
  // }

  // async function fetchUserBlogs() {
  //   const loggedUser = window.localStorage.getItem('loggedBloglistUser')
  //   if(loggedUser) {
  //     const user = JSON.parse(loggedUser)
  //     const receivedUserBlogs = await blogService.getUserBlogs(user)
  //     const sortedUserBlogs = sortBlogsByLikes(receivedUserBlogs)
  //     setUserBlogs(sortedUserBlogs)
  //   }
  // }

  // useEffect(() => {
  //   fetchUserBlogs()
  // }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const newUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(newUser))
      userDispatch( { type: 'LOGIN', payload: newUser })
      setUsername('')
      setPassword('')
      setToken(newUser.token)
      notifDispatch({ type: 'SUCCESS', message: 'successfully logged in' })
    }
    catch(err){
      console.log(err)
      notifDispatch({ type: 'ERROR', message: 'could not log in' })
    }

    // try {
    //   const user = await loginService.login({
    //     username, password,
    //   })

    //   window.localStorage.setItem(
    //     'loggedBloglistUser', JSON.stringify(user)
    //   )
    //   setUser(user)
    //   setUsername('')
    //   setPassword('')

    //   setToken(user.token)

    //   notifDispatch({ type: 'SUCCESS', message: 'successfully logged in' })
    // } catch (err) {
    //   notifDispatch({ type: 'ERROR', message: 'could not log in' })
    // }
  }

  const addBlog = async (blogObj) => {
    console.log(blogObj)
    addNewBlogMutation.mutate(blogObj)
    // try {
    //   const addedBlog = await blogService.createBlog(blogObj)
    //   const extendedBlog = { ...addedBlog, username: user.name }
    //   setBlogs(blogs.concat(extendedBlog))
    //   setUserBlogs(userBlogs.concat(extendedBlog))
    //   notifDispatch({ type: 'SUCCESS', message: `a new blog ${addedBlog.title} by ${addedBlog.author} added` })
    // } catch (err) {
    //   notifDispatch({ type: 'ERROR', message: 'Failed to add blog' })
    // }
    blogFormRef.current.toggleVisibility()
  }

  const likeBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlogMutation.mutate(likedBlog)

    // try {
    //   const updatedBlog = await blogService.updateBlog(id, likedBlog)

    //   setBlogs(blogs.map(b => b.id !== id ? b : updatedBlog ))
    //   setUserBlogs(userBlogs.map(b => b.id !== id ? b : updatedBlog ))
    //   notifDispatch({ type: 'SUCCESS', message: `liked blog ${updatedBlog.title} by ${updatedBlog.author}` })
    // }
    // catch (err) {
    //   notifDispatch({ type: 'ERROR', message: 'Failed to like a blog' })
    // }
  }

  const removeBlog = async (id) => {
    console.log(id)
    const blog = blogs.find(b => b.id === id)

    let userConfirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if(userConfirmed) {
      deleteBlogMutation.mutate(id)
    }
    // if(userConfirmed) {
    //   try {
    //     await blogService.deleteBlog(id)
    //     fetchBlogs()
    //     fetchUserBlogs()
    //     notifDispatch({ type: 'SUCCESS', message: `removed blog ${blog.title} by ${blog.author}` })
    //   }
    //   catch(err){
    //     notifDispatch({ type: 'ERROR', message: 'Failed to remove a blog' })
    //   }
    // }
  }

  if(blogsResult.isLoading) {
    return <div>loading data...</div>
  }

  return (
    <div>
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

      {user && <div>
        <p>{user.name} logged in</p>
        <button onClick={() => {
          window.localStorage.clear()
          userDispatch({ type: 'LOGOUT' })
          // setUser(null)
        }}>logout</button>

        <h2>create new</h2>

        <Togglable buttonLabel='new note' ref={blogFormRef}>
          <BlogForm
            createBlog={addBlog}
          />
        </Togglable>

        <h3>All blogs:</h3>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLikes={likeBlog} handleRemove={removeBlog} user={user}/>
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