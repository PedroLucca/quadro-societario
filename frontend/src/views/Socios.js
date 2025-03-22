import React from 'react';
import { Box } from '@mui/material';
import SocioLista from '../components/socios/SocioLista';

const Socios = () => {
  return (
    <Box sx={{ flexGrow: 1, mt: 8  }}>
      <SocioLista />
    </Box>
  );
};

export default Socios;