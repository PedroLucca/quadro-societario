import React, { useContext } from 'react';
import { Box, Grid2, Typography, Paper, CircularProgress } from '@mui/material';
import { Business as BusinessIcon, Group as GroupIcon } from '@mui/icons-material';
import { EmpresaContext } from '../context/EmpresaContext';
import { SocioContext } from '../context/SocioContext';
import CardTotalizador from '../components/commons/CardTotalizador';

const Dashboard = () => {
  const { empresas, loading: loadingEmpresas } = useContext(EmpresaContext);
  const { socios, loading: loadingSocios } = useContext(SocioContext);

  return (
    <Box sx={{ flexGrow: 1, mt: 8 }}>
      <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Sistema de Quadro Societário
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gerencie suas empresas e sócios de forma fácil e eficiente.
        </Typography>
      </Paper>

      <Grid2 container spacing={3}>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <CardTotalizador
            titulo="Total de Empresas"
            valor={loadingEmpresas ? <CircularProgress size={24} /> : empresas.length}
            icon={<BusinessIcon sx={{ color: 'primary.main' }} />}
            cor="primary"
          />
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <CardTotalizador
            titulo="Total de Sócios"
            valor={loadingSocios ? <CircularProgress size={24} /> : socios.length}
            icon={<GroupIcon sx={{ color: 'secondary.main' }} />}
            cor="secondary"
          />
        </Grid2>
        <Grid2 item size={{ xs: 12 }}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Instruções de uso
            </Typography>
            <Typography variant="body1"  sx={{ marginBottom: 2 }}>
              Utilize o menu lateral para navegar entre as diferentes seções do sistema.
            </Typography>
            <Typography variant="body1"  sx={{ marginBottom: 2 }}>
              Para gerenciar empresas, acesse o menu "Empresas" e utilize as opções para adicionar, editar ou remover registros.
            </Typography>
            <Typography variant="body1">
              Para gerenciar sócios, acesse o menu "Sócios" e utilize as opções para adicionar, editar ou remover registros. Lembre-se que é necessário cadastrar ao menos uma empresa antes de adicionar sócios.
            </Typography>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Dashboard;