import { createContext, useContext, useReducer } from "react"

const notificationsReducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            const addedMsg = action.payload
            return addedMsg
        case 'VOTE':
            const votedMsg = action.payload
            return votedMsg
        case 'ERR_SHORT':
            const errMsg = action.payload
            return errMsg
        case 'REMOVE':
            return ''
        default:
            return ''
    }
}

const NotificationsContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationsReducer, '')

    return (
        <NotificationsContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationsContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationsContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationsContext)
    return notificationAndDispatch[1]
}

export default NotificationsContext