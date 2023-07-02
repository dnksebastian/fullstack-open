import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const loginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => (

  <Form onSubmit={handleLogin}>
    <Form.Group>
      <Form.Label>username:</Form.Label>
      <Form.Control id="username" type="text" value={username} name="Username" onChange={handleUsernameChange}></Form.Control>
    </Form.Group>
    <Form.Group>
      <Form.Label>password:</Form.Label>
      <Form.Control id="password" type="password" value={password} name="Password" onChange={handlePasswordChange}></Form.Control>
    </Form.Group>
    <Button type="submit" variant='primary'>login</Button>
  </Form>
)

loginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default loginForm