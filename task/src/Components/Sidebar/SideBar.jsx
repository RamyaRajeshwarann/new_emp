import React from 'react';
import { Typography,Container } from '@mui/material';
import iz from '../../Logo/iZ.png'
import groupicon from '../../Logo/Group 2.png'
function SideBar() {
    return (
        <Container maxWidth='xl'
            sx={{
                
                width: '92px',          
                height: '100vh',      
                position: 'fixed',        
                top: 0,
                left: 0,
                display: 'flex',
                flexDirection: 'column',  
                justifyContent: 'flex-start', 
                alignItems: 'center',     
                paddingTop: 3,            
            }}
            >
            <img src={iz} width={'65px'} height={'59px'} alt='IZ'/>
            <img src={groupicon} width={'74px'} height={'70px'} style={{ marginTop: '50px' }} alt='group icon'/>
        </Container>
    );
}

export default SideBar