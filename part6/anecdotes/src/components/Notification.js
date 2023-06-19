import { useSelector } from 'react-redux'


const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 50,
    maxWidth: 'max-content'
  }
  
  const notification = useSelector(({notificationMsg}) => {
    if(notificationMsg) {
      return notificationMsg
    } else {
      return null
    }
  })

  if (notification) {
    return (
        <div style={style}>
        {notification}
      </div>
    )
  } else {
    return null
  }

}

export default Notification