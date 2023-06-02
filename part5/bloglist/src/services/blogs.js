import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)

  if(Array.isArray(response.data)) {
    return response.data
  } else {
    return []
  }
}

const getUserBlogs = async (user) => {
  const response = await axios.get(baseUrl)

  if(Array.isArray(response.data)) {
    const blogs = response.data
    const filteredBlogs = blogs.filter(b => b.user.username === user.username)
    return filteredBlogs
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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getUserBlogs, createBlog, updateBlog, setToken }