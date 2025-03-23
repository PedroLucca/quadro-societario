import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/commons/Layout';
import Dashboard from './views/Dashboard';
import Empresas from './views/Empresas';
import Socios from './views/Socios';
import Login from './views/Login';
import Registrar from './views/Registrar';
import PrivateRoute from './components/commons/PrivateRoute';
import { EmpresaProvider } from './context/EmpresaContext';
import { SocioProvider } from './context/SocioContext';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <EmpresaProvider>
          <SocioProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registrar" element={<Registrar />} />
                
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={
                    <Layout>
                      <Dashboard />
                    </Layout>
                  } />
                  <Route path="/dashboard" element={
                    <Layout>
                      <Dashboard />
                    </Layout>
                  } />
                  <Route path="/empresas" element={
                    <Layout>
                      <Empresas />
                    </Layout>
                  } />
                  <Route path="/socios" element={
                    <Layout>
                      <Socios />
                    </Layout>
                  } />
                </Route>
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </SocioProvider>
        </EmpresaProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;