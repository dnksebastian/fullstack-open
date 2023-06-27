import { useRef } from 'react'
import { useNotificationValue, useNotificationDispatch } from '../NotificationsContext'


const Notification = () => {
  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch()

  let notificationStyle = notification.type ? notification.type.toLowerCase() : ''

  const timer = useRef(0)
  if (timer.current !== 0) {
    clearTimeout(timer.current)
  }
  timer.current = setTimeout(() => {
    dispatch({ type: 'CLEAR' })
  }, 5000)


  // console.log('notification rendered')

  if(notification.message) {
    return (
      <div className={notificationStyle}>
        {notification.message}
      </div>
    )
  } else {
    return null
  }

}

export default Notification