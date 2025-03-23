import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { EmpresaProvider } from './context/EmpresaContext';
import { SocioProvider } from './context/SocioContext';
import { AuthProvider } from './context/AuthContext';
import MainRoutes from './routes/MainRoutes';

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
              <MainRoutes />
            </BrowserRouter>
          </SocioProvider>
        </EmpresaProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;