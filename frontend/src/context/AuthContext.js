import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem('token');
    
    if (token) {

      api.defaults.headers.common['Authorization'] = token;
      setAuthenticated(true);
      
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post('/usuarios/login', credentials);
      const { token, usuario } = response.data;
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = token;
      
      setUser(usuario);
      setAuthenticated(true);
      
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Falha ao realizar login' 
      };
    }
  };

  const logout = async () => {
    try {

      await api.post('/usuarios/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {

      localStorage.removeItem('token');

      delete api.defaults.headers.common['Authorization'];
      
      setUser(null);
      setAuthenticated(false);
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/usuarios/registrar', userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Falha ao realizar o registro' 
      };
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        authenticated, 
        loading,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};