import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showNotification(state, action) {
            if(action.payload.type === 'vote') {
                return state = `you voted '${action.payload.text}'`
            } else if (action.payload.type === 'add') {
                return state = `you added '${action.payload.text}'`
            } else {
                return state = ''
            }
        },
        removeNotification(state) {
            return state = ''
        }
    }
})

export const { showNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer