import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'
import { useRef } from 'react'


const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 50,
    maxWidth: 'max-content'
  }
  
  console.log('rendered');
  const dispatch = useDispatch()
  const timeoutRef = useRef(0)
  
  const notification = useSelector(({notificationMsg}) => {
    if(notificationMsg) {
      clearTimeout(timeoutRef.current)
      const timeoutID = setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
      timeoutRef.current = timeoutID
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