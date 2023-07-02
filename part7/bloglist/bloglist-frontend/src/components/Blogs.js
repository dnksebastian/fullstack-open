import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Table } from 'react-bootstrap'

import { useNotificationDispatch } from '../NotificationsContext'

import { getAllBlogs, createNewBlog } from '../services/blogs'

const Blogs = () => {
  const queryClient = useQueryClient()
  const blogFormRef = useRef()

  const notifDispatch = useNotificationDispatch()

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

  const blogsResult = useQuery('blogs', getAllBlogs, {
    refetchOnWindowFocus: false,
  })

  const sortBlogsByLikes = (blogsArr) => {
    if(blogsArr) {
      const sortedBlogs = blogsArr.sort((prev, next) => next.likes - prev.likes)
      return sortedBlogs
    } else {
      return []
    }
  }

  const initialBlogs = blogsResult.data
  const blogs = sortBlogsByLikes(initialBlogs)
  // let userBlogs = []

  // if(blogs && user) {
  //   userBlogs = blogs.filter(b => b.user.username === user.username)
  // }

  const addBlog = async (blogObj) => {
    addNewBlogMutation.mutate(blogObj)
    blogFormRef.current.toggleVisibility()
  }

  if(blogsResult.isLoading) {
    return <div>loading data...</div>
  }

  return (
    <>
      <h2>create new</h2>

      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>

      <h3>All blogs:</h3>
      <Table striped>
        <tbody>
          {
            blogs.map(blog =>
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>
                  {blog.user.name}
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </>
  )
}

export default Blogs