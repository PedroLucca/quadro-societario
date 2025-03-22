import React, { createContext, useState, useCallback, useEffect } from 'react';
import { empresaService } from '../services/empresaService';

export const EmpresaContext = createContext();

export const EmpresaProvider = ({ children }) => {
  const [empresas, setEmpresas] = useState([]);
  const [totalEmpresas, setTotalEmpresas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({});

  const fetchEmpresas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await empresaService.getAll(filtros);
      setEmpresas(response.data);
    } catch (err) {
      setError(err.message || 'Erro ao buscar empresas');
      console.error('Erro ao buscar empresas:', err);
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  const countEmpresas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await empresaService.getAll(filtros);
      setTotalEmpresas(response.data);
    } catch (err) {
      setError(err.message || 'Erro ao buscar total de empresas');
      console.error('Erro ao buscar total de empresas:', err);
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  const getEmpresa = async (id) => {
    try {
      const response = await empresaService.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message || 'Erro ao buscar empresa');
      console.error('Erro ao buscar empresa:', err);
      return null;
    }
  };

  const createEmpresa = async (data) => {
    try {
      const response = await empresaService.create(data);
      fetchEmpresas();
      return response.data;
    } catch (err) {
      setError(err.message || 'Erro ao criar empresa');
      console.error('Erro ao criar empresa:', err);
      throw err;
    }
  };

  const updateEmpresa = async (id, data) => {
    try {
      const response = await empresaService.update(id, data);
      fetchEmpresas();
      return response.data;
    } catch (err) {
      setError(err.message || 'Erro ao atualizar empresa');
      console.error('Erro ao atualizar empresa:', err);
      throw err;
    }
  };

  const deleteEmpresa = async (id) => {
    try {
      await empresaService.delete(id);
      fetchEmpresas();
      return true;
    } catch (err) {
      setError(err.message || 'Erro ao excluir empresa');
      console.error('Erro ao excluir empresa:', err);
      throw err;
    }
  };

  /* useEffect(() => {
    fetchEmpresas();
  }, [fetchEmpresas]); */

  return (
    <EmpresaContext.Provider
      value={{
        empresas,
        totalEmpresas,
        loading,
        error,
        filtros,
        setFiltros,
        fetchEmpresas,
        getEmpresa,
        createEmpresa,
        updateEmpresa,
        deleteEmpresa
      }}
    >
      {children}
    </EmpresaContext.Provider>
  );
};