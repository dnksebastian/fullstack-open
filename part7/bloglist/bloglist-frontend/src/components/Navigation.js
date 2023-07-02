import { Link } from 'react-router-dom'
import { useUserValue, useUserDispatch } from '../UserContext'

import { Nav, Navbar, Badge, Button } from 'react-bootstrap'

const Navigation = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch()
  console.log(userDispatch)

  // const navStyle = {
  //   display: 'flex',
  //   alignItems: 'center',
  //   gap: 5,
  //   backgroundColor: 'hsla(240, 100%, 50%, 20%)'
  // }

  // const navlinkStyles = {
  //   padding: 2,
  //   textDecoration: 'none'
  // }

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' className='gap-2 p-2'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav' className="gap-2 mx-4">
        <Nav.Link to='/' as={Link} className='bg-light p-2 mt-2 mt-lg-0 text-center'>
          {/* <Link to='/'>home</Link> */}
          home
        </Nav.Link>
        <Nav.Link to='/blogs' as={Link} className='bg-light p-2 mt-2 mt-lg-0 text-center'>
          {/* <Link to='/blogs'>blogs</Link> */}
          blogs
        </Nav.Link>
        <Nav.Link to='/users' as={Link} className='bg-light p-2 mt-2 mt-lg-0 text-center'>
          {/* <Link to='/users'>users</Link> */}
          users
        </Nav.Link>
        <Nav.Item className='bg-success mt-2 mt-lg-0 ms-lg-auto'>
          {user ? <Nav.Item className="d-flex gap-3 p-2"><Badge bg='info' className='d-flex align-items-center'><span className='align-middle'>{user.name} logged in</span></Badge> <Button onClick={() => {
            window.localStorage.clear()
            userDispatch({ type: 'LOGOUT' })
          }}>logout</Button></Nav.Item> : <Link to='/login'>login</Link>}
        </Nav.Item>
      </Navbar.Collapse>
    </Navbar>
    // <div style={navStyle}>
    //   <Link style={navlinkStyles} to='/'>Home</Link>
    //   <Link style={navlinkStyles} to='/blogs'>Blogs</Link>
    //   <Link style={navlinkStyles} to='/users'>Users</Link>
    //   <p>{user.name} logged in</p>
    //   <button onClick={() => {
    //     window.localStorage.clear()
    //     userDispatch({ type: 'LOGOUT' })
    //   }}>logout</button>
    // </div>
  )
}

export default Navigation