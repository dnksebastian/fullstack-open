import { useState, useEffect } from 'react'
// import User from './User'
import { Link } from 'react-router-dom'

import userServices from '../services/users'

const UsersInformation = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getUsers() {
      const fetchedUsers = await userServices.getAllUsers()
      setUsers(fetchedUsers)
    }
    getUsers()
  }, [])

  console.log(users)


  return (
    <>
      <h3>Users</h3>
      <ul className='users-list'>
        <li><span></span><span>blogs created</span></li>
        {users.map(user => <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link><span>{user.blogs.length}</span>
        </li>)}
      </ul>
    </>
  )
}

export default UsersInformation