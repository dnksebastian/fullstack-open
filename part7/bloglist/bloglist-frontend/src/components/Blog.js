// import { useState } from 'react'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'

import { useNotificationDispatch } from '../NotificationsContext'
import { useUserValue } from '../UserContext'
import { getAllBlogs, updateBlog, deleteBlog, postComment } from '../services/blogs'


import CommentForm from './CommentForm'

const Blog = () => {

  const id = useParams().id
  const navigate = useNavigate()

  const currentUser = useUserValue()
  const notifDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const blogsResult = useQuery('blogs', getAllBlogs, {
    refetchOnWindowFocus: false,
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
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      navigate('/')
      notifDispatch({ type: 'SUCCESS', message: 'removed blog' })
    },
    onError: () => {
      notifDispatch({ type: 'ERROR', message: 'Failed to remove a blog' })
    }
  })

  const postCommentMutation = useMutation(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      notifDispatch({ type: 'SUCCESS', message: 'Posted comment' })
    },
    onError: () => {
      notifDispatch({ type: 'ERROR', message: 'Failed to post comment' })
    }
  })

  if(blogsResult.isLoading) {
    return <div>loading data...</div>
  }

  const initialBlogs = blogsResult.data

  const tblog = initialBlogs.find(b => b.id === id)
  const blogCommentsArr = tblog.comments

  const likeBlog = async (blogid) => {
    const blog = initialBlogs.find(b => b.id === blogid)
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlogMutation.mutate(likedBlog)
  }

  const removeBlog = async (id) => {
    const blog = initialBlogs.find(b => b.id === id)

    let userConfirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if(userConfirmed) {
      deleteBlogMutation.mutate(id)
    }
  }

  const addComment = (comment) => {
    const mutationData = {
      id: tblog.id,
      comment
    }
    postCommentMutation.mutate(mutationData)
  }

  const isOwner = () => {
    return currentUser.username === tblog.user.username ? true : false
  }

  const blogStyle = {
    padding: '1rem 1rem 1rem 1rem',
    border: '1px solid',
    borderRadius: '1rem',
    marginBottom: 5,
    marginTop: 20,
    maxWidth: 'fit-content'
  }

  return (
    <div style={blogStyle} className='blogpost'>
      <h2>{tblog.title}</h2>
      <p>{tblog.url}</p>
      <div>
        <span className='blog-likes'>{tblog.likes}</span> <button className='btn-likeblog' onClick={() => {likeBlog(tblog.id)}}>like</button>
      </div>
      <p className='blog-addedby'>{tblog.user.name}</p>
      {isOwner() && <button className='btn-removeblog' onClick={() => {removeBlog(tblog.id)}}>remove</button>}
      <p><b>comments</b></p>
      <CommentForm sendComment={addComment} />
      {blogCommentsArr && <div>
        <ul>
          {blogCommentsArr.map(comment => <li key={comment._id}>{comment.message}</li>)}
        </ul>
      </div>
      }
    </div>
  )
}

export default Blog