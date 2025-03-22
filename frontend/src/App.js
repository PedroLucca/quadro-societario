import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/commons/Layout';
import Dashboard from './views/Dashboard';
import Empresas from './views/Empresas';
import Socios from './views/Socios';
import { EmpresaProvider } from './context/EmpresaContext';
import { SocioProvider } from './context/SocioContext';

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
      <EmpresaProvider>
        <SocioProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/empresas" element={<Empresas />} />
                <Route path="/socios" element={<Socios />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </SocioProvider>
      </EmpresaProvider>
    </ThemeProvider>
  );
}

export default App;