import { useState } from "react"

const Blog = ({blog}) => {
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)

  const blogStyle = {
    padding: '1rem 1rem 1rem 1rem',
    border: '1px solid',
    borderRadius: '1rem',
    marginBottom: 5,
    maxWidth: 'fit-content'
  }
  
  return (
  <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      {!blogDetailsVisible && <button onClick={() => setBlogDetailsVisible(true)}>view</button>}
      {blogDetailsVisible && <button onClick={() => setBlogDetailsVisible(false)}>hide</button>}
      </div>
      {blogDetailsVisible &&
        <><div>{blog.url}</div>
        <div>{blog.likes} <button>like</button> </div>
        <div>{blog.user.name}</div></>
      }
  </div>
  )}
  
  export default Blog