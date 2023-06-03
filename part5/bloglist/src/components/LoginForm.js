import PropTypes from 'prop-types'

const loginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => (

  <form onSubmit={handleLogin}>
    <div>
        username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
        password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

loginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default loginForm