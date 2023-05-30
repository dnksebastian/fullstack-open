import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)

  if(Array.isArray(response.data)) {
    console.log(response.data)
    return response.data
  } else {
    return []
  }
  // return request.then(response => response.data)
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


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getUserBlogs, createBlog, setToken }