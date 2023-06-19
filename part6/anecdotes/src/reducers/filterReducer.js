import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterChange(state, action) {
            const newFilter = action.payload
            return state = newFilter
        }
    },
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer