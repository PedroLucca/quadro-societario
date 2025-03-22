import React from 'react';
import { Box } from '@mui/material';
import EmpresaLista from '../components/empresas/EmpresaLista';

const Empresas = () => {
  return (
    <Box sx={{ flexGrow: 1, mt: 8 }}>
      <EmpresaLista />
    </Box>
  );
};

export default Empresas;