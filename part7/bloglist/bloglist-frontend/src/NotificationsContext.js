import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type) {
  case 'SUCCESS': {
    const successNotification = {
      type: action.type,
      message: action.message,
    }
    return state = successNotification
  }
  case 'ERROR': {
    const errorNotification = {
      type: action.type,
      message: action.message,
    }
    return state = errorNotification
  }
  case 'CLEAR': {
    const clearNotification = {
      type: '',
      message: '',
    }
    return state = clearNotification
  }
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, { type: '', message: '' })
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext