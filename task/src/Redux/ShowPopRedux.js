import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showPopUpForm: false,
    showPopUpAlert: {
        open: false,
        id: null, 
    },
}

const showPopUpSlice = createSlice({
    name: "showPopUpReducer",
    initialState,
    reducers: {
        handlePopUpForm: (state, action) => {
            state.showPopUpForm = action.payload 
        },
        handlePopUpAlert: (state, action) => {
            const { open, id } = action.payload 
            state.showPopUpAlert.open = open 
            state.showPopUpAlert.id = id     
        },
    },
})

export const { handlePopUpForm, handlePopUpAlert } = showPopUpSlice.actions
export default showPopUpSlice.reducer

