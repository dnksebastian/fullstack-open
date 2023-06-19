import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        removeNotification(state) {
            return ''
        }
    }
})

export const { showNotification, removeNotification } = notificationSlice.actions

let timerID
export const setNotification = (message, time) => {
    return async (dispatch) => {
        const displayTime = time * 1000
        dispatch(showNotification(message))
        
        if(timerID) {
            clearTimeout(timerID)
        }

        timerID = setTimeout(() => {
            dispatch(removeNotification())
        }, displayTime)
        
    }
}

export default notificationSlice.reducer