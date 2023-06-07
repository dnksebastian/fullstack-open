import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0,
  })

  const addBlog = (e) => {
    e.preventDefault()
    createBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: '',
      likes: 0,
    })
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <span>title</span>
        <input
          id='title-input'
          className='title-input'
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        />
      </div>
      <div>
        <span>author</span>
        <input
          id='author-input'
          className='author-input'
          value={newBlog.author}
          onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
        />
      </div>
      <div>
        <span>url</span>
        <input
          id='url-input'
          className='url-input'
          value={newBlog.url}
          onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
        />
      </div>
      <button id='btn-newblog' type="submit">create</button>
    </form>
  )
}

export default BlogForm
