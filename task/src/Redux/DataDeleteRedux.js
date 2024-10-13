import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    deleteData: false,
    deleteId: null,  
}

const dataDeleteSlice = createSlice({
    name: "dataDeleteReducer",
    initialState,
    reducers: {
        handleDeleteOption: (state, action) => {
            state.deleteData = action.payload.deleteData 
            state.deleteId = action.payload.id 
        },
        clearDeleteOption: (state) => {
            state.deleteData = false 
            state.deleteId = null 
        },
    },
})

export const { handleDeleteOption, clearDeleteOption } = dataDeleteSlice.actions
export default dataDeleteSlice.reducer
