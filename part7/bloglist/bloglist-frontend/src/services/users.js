import axios from 'axios'

const baseUrl = '/api/users'

const getAllUsers = async () => {
  const response = await axios.get(`${baseUrl}`)
  return response.data
}


const userServices = {
  getAllUsers
}

export default userServices