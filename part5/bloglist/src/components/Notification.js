const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }

    if (type === 'err') {
        return (
          <div className="error">
            {message}
          </div>
        )
    } else if (type === 'success') {
        return (
          <div className="success">
            {message}
          </div>
        )
    }
  
  }
  
  export default Notification