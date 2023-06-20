import { useNotificationValue, useNotificationDispatch } from "../AnecdotesContext"
import { useRef } from "react"

const Notification = () => {

  const notificationMessage = useNotificationValue()
  const notificationDispatch = useNotificationDispatch()

  let notificationTimer = useRef(0)

  if (notificationTimer.current !== 0) {
    clearTimeout(notificationTimer.current)
  }
  notificationTimer.current = setTimeout(() => {
    notificationDispatch({type: 'REMOVE'})
  }, 5000)
  
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      marginBottom: 5,
      maxWidth: 'max-content'
    }

      return (
        <div style={style}>
          {notificationMessage}      
        </div>
      )
   
  }
  
  export default Notification