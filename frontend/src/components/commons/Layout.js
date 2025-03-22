import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          p: 3
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;