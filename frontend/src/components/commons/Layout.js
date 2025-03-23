import React, { useContext, useEffect } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate('/login');
    }
  }, [authenticated, navigate]);

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