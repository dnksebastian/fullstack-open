import { useState, useEffect } from 'react'
// import User from './User'
import { Link } from 'react-router-dom'

import userServices from '../services/users'

const UsersInformation = () => {
  const [users, setUsers] = useState([])

  const userListStyles = {
    listStyle: 'none'
  }

  const rightSpanStyle = {
    marginLeft: 10
  }

  const liStyle = {
    marginTop: 10,
    maxWidth: 'max-content',
    border: '1px solid grey',
    borderRadius: 10,
    padding: 10
  }

  useEffect(() => {
    async function getUsers() {
      const fetchedUsers = await userServices.getAllUsers()
      setUsers(fetchedUsers)
    }
    getUsers()
  }, [])


  return (
    <>
      <h3>Users</h3>
      <ul style={userListStyles}>
        <li><span></span><span><b>blogs created</b></span></li>
        {users.map(user => <li key={user.id} style={liStyle}>
          <Link to={`/users/${user.id}`}>{user.name}</Link><span style={rightSpanStyle}>{user.blogs.length}</span>
        </li>)}
      </ul>
    </>
  )
}

export default UsersInformation