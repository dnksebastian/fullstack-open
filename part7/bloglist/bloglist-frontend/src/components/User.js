import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)

  if (!user) {
    return null
  }

  const userBlogs = user.blogs

  return (
    <div>
      <h2>{user.name}</h2>
      <p><b>added blogs</b></p>
      <ul>
        {userBlogs.map(blog => <li key={blog.title}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User