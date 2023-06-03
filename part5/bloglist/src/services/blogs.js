import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)

  if(Array.isArray(response.data)) {
    const sortedByLikes = [...response.data].sort((prev, next) => prev.likes < next.likes)
    // return response.data
    return sortedByLikes
  } else {
    return []
  }
}

const getUserBlogs = async (user) => {
  const response = await axios.get(baseUrl)

  if(Array.isArray(response.data)) {
    const blogs = response.data
    const filteredBlogs = blogs.filter(b => b.user.username === user.username)
    const sortedFilteredBlogs = [...filteredBlogs].sort((prev,next) => prev.likes < next.likes)
    // return filteredBlogs
    return sortedFilteredBlogs
  } else {
    return []
  }
}

const createBlog = async newBlog => {

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)

  return response.data
}

const updateBlog = async (id, newObj) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObj, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

// eslint-disable-next-line
export default { getAll, getUserBlogs, createBlog, updateBlog, deleteBlog, setToken }