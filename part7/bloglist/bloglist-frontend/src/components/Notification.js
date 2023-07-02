import { useRef } from 'react'
import { useNotificationValue, useNotificationDispatch } from '../NotificationsContext'

import { Alert } from 'react-bootstrap'


const Notification = () => {
  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch()

  // let notificationStyle = notification.type ? notification.type.toLowerCase() : ''
  const notificationStyle = () => {
    switch(notification.type) {
    case 'SUCCESS':
      return 'success'
    case 'ERROR':
      return 'warning'
    default:
      return 'primary'
    }
  }

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
      // <div className={notificationStyle}>
      //   {notification.message}
      // </div>
      <Alert variant={notificationStyle()}>
        {notification.message}
      </Alert>
    )
  } else {
    return null
  }

}

export default Notification