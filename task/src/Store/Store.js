import {configureStore} from '@reduxjs/toolkit'
import addEmployeeReducer from '../Redux/AddEmployeeRedux'
import showPopUpReducer from '../Redux/ShowPopRedux'
import dataDeleteReducer from '../Redux/DataDeleteRedux'


export const store = configureStore({
    reducer: {
        addEmployeeReducer: addEmployeeReducer,
        showPopUpReducer: showPopUpReducer,
        dataDeleteReducer: dataDeleteReducer
    }
})