import React, { useMemo } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, IconButton, Container } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector, useDispatch } from 'react-redux'
import { handleEditData, handleEditOption } from '../../Redux/AddEmployeeRedux'
import { handlePopUpForm, handlePopUpAlert } from '../../Redux/ShowPopRedux' 
import PropTypes from 'prop-types'
import { handleDeleteOption } from '../../Redux/DataDeleteRedux'

function DataTable({ onDeleteClick }) {
  const dispatch = useDispatch()
  const { tableData } = useSelector((state) => ({
    tableData: state.addEmployeeReducer.tableData,
  }))

  const handleDataToEdit = (id) => {
    dispatch(handleEditData(id))
    dispatch(handleEditOption(true))
    dispatch(handlePopUpForm(true))
  }

  const handleDataToDelete = (id) => {
    console.log("Selected ID for deletion:", id) 
    dispatch(handlePopUpAlert({open:true,id})) 
    dispatch(handleDeleteOption(id))
  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'email', headerName: 'Email Address', width: 350 },
    { field: 'phone', headerName: 'Phone Number', width: 250 },
    { field: 'location', headerName: 'Location', width: 200 },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box>
          <IconButton sx={{ mr: 1 }} onClick={() => handleDataToEdit(params.row.id)}>
            <EditIcon sx={{ color: 'blue' }} />
          </IconButton>
          <IconButton sx={{ ml: 1 }} onClick={() => handleDataToDelete(params.row.id)}>
            <DeleteIcon sx={{ color: 'red' }} />
          </IconButton>
        </Box>
      ),
    },
  ]

  const rows = useMemo(() => tableData.map((data) => ({
    id: data.id,
    name: data.values.name,
    email: data.values.email,
    phone: data.values.phone,
    location: data.values.location,
  })), [tableData])

  return (
    <Container maxWidth="xl" sx={{ mt: 2, height: '80%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Container>
  )
}

DataTable.propTypes = {
  onDeleteClick: PropTypes.func.isRequired, 
}

export default DataTable

