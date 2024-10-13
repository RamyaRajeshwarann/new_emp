import React,{Fragment}  from 'react';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useDispatch } from 'react-redux';
import { handlePopUpForm } from '../../Redux/ShowPopRedux';
import { Typography } from '@mui/material';
import {handleNewForm } from '../../Redux/AddEmployeeRedux';

function AddEmployeeSection() {

    const usedispatch = useDispatch()
    // function for open new form
    const handleOpenNewForm = () =>{
        usedispatch(handlePopUpForm(true))
        usedispatch(handleNewForm(true))
    }

    const theme = createTheme({
        typography: {
          fontFamily: 'Poppins, Arial, sans-serif',
        },
      });
    
    return (
       <Fragment>
            <Grid container  sx={{ml:3, display:'flex',justifyContent:'space-between'}}>
                <Grid>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <Typography sx={{fontWeight:'600'}} fontSize={'20px'} >Employees</Typography>
                        <Typography sx={{fontWeight:'300'}}fontSize={'13px'}>Here is a list of all employees</Typography>
                    </ThemeProvider>
                </Grid>
                <Grid  sx={{mr:3}}>
                    <Button variant="contained" onClick={() => handleOpenNewForm()}>
                        Add employee
                    </Button>
                </Grid>
            </Grid>
       </Fragment>
    )
}

export default AddEmployeeSection