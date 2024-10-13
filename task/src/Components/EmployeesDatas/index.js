import React from 'react';
import DataTable from './DataTable';
import AddEmployeeSection from './AddEmployeeSection';
import { Container } from '@mui/material';

function Dashboard() {
    return (
     
        <Container maxWidth='xl' 
        sx={{
            backgroundColor: '#F5F5F5',
            mt:10,
            p:6,
            width:'1450px',
            height:'700px',
            ml:12,
            borderTopLeftRadius:'30px',
            position:'fixed'
            }} 
            >
            <AddEmployeeSection/>
            <DataTable/>
        </Container>
    
    )
}

export default Dashboard;