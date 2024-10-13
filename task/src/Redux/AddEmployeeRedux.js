import {createSlice,current} from '@reduxjs/toolkit'

 const  initialState ={
    tableData:[],
    isNew: false,
    dataToEdit:'',
    isEdit: false,
    editedDataIndex:''
}

const addEmployeeSlice = createSlice({
    name:"addEmployeeReducer",
    initialState,
    reducers:{
        updateTableData: (state,action) =>{
            state.tableData = [...state.tableData,action.payload]
        },
        handleNewForm: (state,actions) =>{
            state.isNew = actions.payload
        },
        handleEditedData: (state,action)=>{
            const currentState = current(state);
            state.tableData = currentState.tableData.map((item, idx) => 
              item.id === action.payload.id ? action.payload : item
            )
        },
        handleEditData: (state,action) =>{
            const currentState = current(state);
            state.dataToEdit = currentState.tableData.filter((item,index) => 
                item.id === action.payload && item 
            )
        },
        handleEditOption: (state,action) =>{
            state.isEdit = action.payload
        },
        handleDeleteData: (state,action) =>{
            const currentState = current(state);
            state.tableData = currentState.tableData.filter((employee) => employee.id !== action.payload);
        }
    }
})
export const {updateTableData,handleNewForm,handleEditData,handleEditOption,handleEditedData,handleDeleteData} = addEmployeeSlice.actions
export default addEmployeeSlice.reducer