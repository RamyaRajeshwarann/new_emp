import React, { Fragment, useState } from 'react'
import { Box, Container, Card, CardHeader, CardContent, Button, Typography, Snackbar } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useSelector, useDispatch } from 'react-redux'
import { handlePopUpAlert } from '../../Redux/ShowPopRedux'
import axios from 'axios'

function Alert() {
  const { showPopUpAlert } = useSelector((state) => state.showPopUpReducer)
  const dispatch = useDispatch()
  const id = showPopUpAlert.id  
  const [errorMessage, setErrorMessage] = useState("")
  const handleCancel = () => {
      dispatch(handlePopUpAlert({ open: false, id: null })) 
  }
  const handleDelete = async () => {
      try {
          console.log("Deleting ID:", id)  
          await axios.delete(`http://localhost:8081/api/employees/${id}`)
          dispatch(handlePopUpAlert({ open: false, id: null }))  
      } catch (error) {
          console.error("Error deleting employee:", error)
          setErrorMessage("Failed to delete employee. Please try again.")
      }
  }
  const handleCloseSnackbar = () => {
      setErrorMessage("")
  }
  return (
      <Fragment>
          {showPopUpAlert.open && (  
              <Box
                  sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100vw',
                      height: '100vh',
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      zIndex: 1300,
                  }}
              >
                  <Container maxWidth="xs">
                      <Card elevation={3} sx={{ borderRadius: '20px', p: 1 }}>
                          <CardHeader
                              sx={{
                                  '& .MuiCardHeader-title': {
                                      fontSize: '20px',
                                      fontWeight: 'bold',
                                  },
                              }}
                              title="Alert"
                          />
                          <CardContent>
                              <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                      <Typography fontFamily="sans-serif" lineHeight="30px" fontSize="20px">
                                          Are you sure you want to delete this employee?
                                      </Typography>
                                  </Grid>
                                  <Grid container sx={{ width: 1, ml: 1 }}>
                                      <Grid item xs={6} sx={{ ml: 3 }}>
                                          <Button onClick={handleCancel} variant="outlined">
                                              Cancel
                                          </Button>
                                      </Grid>
                                      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                          <Button onClick={()=>handleDelete()} variant="outlined" color="error">
                                              Delete
                                          </Button>
                                      </Grid>
                                  </Grid>
                              </Grid>
                          </CardContent>
                      </Card>
                  </Container>
              </Box>
          )}

          <Snackbar
              open={!!errorMessage}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              message={errorMessage}
          />
      </Fragment>
  )
}

export default Alert




