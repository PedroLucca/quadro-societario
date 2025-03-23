import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/commons/Layout';
import Dashboard from '../views/Dashboard';
import Empresas from '../views/Empresas';
import Socios from '../views/Socios';
import Login from '../views/Login';
import Registrar from '../views/Registrar';
import PrivateRoute from './PrivateRoute';

const MainRoutes = () => {
  return (
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
  );
};

export default MainRoutes;