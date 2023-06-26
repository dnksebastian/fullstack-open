import { useState } from 'react'

const Blog = ({ blog, handleLikes, handleRemove, user }) => {
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)

  const blogStyle = {
    padding: '1rem 1rem 1rem 1rem',
    border: '1px solid',
    borderRadius: '1rem',
    marginBottom: 5,
    maxWidth: 'fit-content'
  }

  const likeBlog = () => {
    handleLikes(blog.id)
  }

  const removeBlog = () => {
    handleRemove(blog.id)
  }

  return (
    <div style={blogStyle} className='blogpost'>
      <div>
        {blog.title} {blog.author}
        {!blogDetailsVisible && <button className='btn-viewdetails' onClick={() => setBlogDetailsVisible(true)}>view</button>}
        {blogDetailsVisible && <button className='btn-hidedetails' onClick={() => setBlogDetailsVisible(false)}>hide</button>}
      </div>
      {blogDetailsVisible &&
        <><div>{blog.url}</div>
          <div><span className='blog-likes'>{blog.likes}</span> <button className='btn-likeblog' onClick={likeBlog}>like</button> </div>
          <div><span className='blog-addedby'>{blog.username || blog.user.name}</span></div>
          {user.username === blog.user.username && <button className='btn-removeblog' onClick={removeBlog}>remove</button>}
        </>
      }
    </div>
  )}

export default Blog