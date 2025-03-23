import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

const PrivateRoute = () => {
    const loading = false;
    const authenticated = false;

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;