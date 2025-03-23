import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { EmpresaProvider } from './context/EmpresaContext';
import { SocioProvider } from './context/SocioContext';

import Layout from './components/commons/Layout';

import Login from './views/Login';
import Registrar from './views/Registrar';
import Dashboard from './views/Dashboard';
import Empresas from './views/Empresas';
import Socios from './views/Socios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AuthProvider> */}
        <EmpresaProvider>
          <SocioProvider>
            <BrowserRouter>
            <Layout>
              <Routes>
                {/* Rotas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/registrar" element={<Registrar />} />
                
                {/* Rotas protegidas */}
                {/* <Route element={<PrivateRoute />}> */}
                
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/empresas" element={<Empresas />} />
                  <Route path="/socios" element={<Socios />} />
                
                {/* </Route> */}
                
               {/*  <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}
              </Routes>
              </Layout>
            </BrowserRouter>
          </SocioProvider>
        </EmpresaProvider>
      {/* </AuthProvider> */}
    </ThemeProvider>
  );
}

export default App;