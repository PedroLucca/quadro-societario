import React, { useContext, useEffect } from 'react';
import { Box, Grid2, Typography, Paper, CircularProgress } from '@mui/material';
import { Business as BusinessIcon, Group as GroupIcon } from '@mui/icons-material';
import { EmpresaContext } from '../context/EmpresaContext';
import { SocioContext } from '../context/SocioContext';
import CardTotalizador from '../components/commons/CardTotalizador';

const Dashboard = () => {
  const { totalEmpresas, loading: loadingEmpresas, countEmpresas } = useContext(EmpresaContext);
  const { totalSocios, loading: loadingSocios, countSocios } = useContext(SocioContext);

  
    useEffect(() => {//Fazer requisições para contar o total de empresas e sócios
      countEmpresas();
      countSocios();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            valor={loadingEmpresas ? <CircularProgress size={24} /> : totalEmpresas}
            icon={<BusinessIcon sx={{ color: 'primary.main' }} />}
            cor="primary"
          />
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <CardTotalizador
            titulo="Total de Sócios"
            valor={loadingSocios ? <CircularProgress size={24} /> : totalSocios}
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