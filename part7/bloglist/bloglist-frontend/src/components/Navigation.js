import { Link } from 'react-router-dom'
import { useUserValue, useUserDispatch } from '../UserContext'

const Navigation = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch()

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'hsla(240, 100%, 50%, 20%)'
  }

  const navlinkStyles = {
    padding: 2,
    textDecoration: 'none'
  }

  return (
    <div style={navStyle}>
      <Link style={navlinkStyles} to='/'>Home</Link>
      <Link style={navlinkStyles} to='/blogs'>Blogs</Link>
      <Link style={navlinkStyles} to='/users'>Users</Link>
      <p>{user.name} logged in</p>
      <button onClick={() => {
        window.localStorage.clear()
        userDispatch({ type: 'LOGOUT' })
      }}>logout</button>
    </div>
  )
}

export default Navigation