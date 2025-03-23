import React, { createContext, useState, useCallback } from 'react';
import { socioService } from '../services/socioService';

export const SocioContext = createContext();

export const SocioProvider = ({ children }) => {
  const [socios, setSocios] = useState([]);
  const [totalSocios, setTotalSocios] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({});

  const fetchSocios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await socioService.getAll(filtros);
      setSocios(response.data);
    } catch (err) {
      setError(err.message || 'Erro ao buscar sócios');
      console.error('Erro ao buscar sócios:', err);
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  const countSocios = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await socioService.getTotal(filtros);
        setTotalSocios(response.data.total);
      } catch (err) {
        setError(err.message || 'Erro ao buscar total de sócios');
        console.error('Erro ao buscar total de sócios:', err);
      } finally {
        setLoading(false);
      }
    }, [filtros]);

  const getSocio = async (id) => {
    try {
      const response = await socioService.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message || 'Erro ao buscar sócio');
      console.error('Erro ao buscar sócio:', err);
      return null;
    }
  };

  const createSocio = async (data) => {
    try {
      const response = await socioService.create(data);
      fetchSocios();
      return response.data;
    } catch (err) {
      setError(err.message || 'Erro ao criar sócio');
      console.error('Erro ao criar sócio:', err);
      throw err;
    }
  };

  const updateSocio = async (id, data) => {
    try {
      const response = await socioService.update(id, data);
      fetchSocios();
      return response.data;
    } catch (err) {
      setError(err.message || 'Erro ao atualizar sócio');
      console.error('Erro ao atualizar sócio:', err);
      throw err;
    }
  };

  const deleteSocio = async (id) => {
    try {
      await socioService.delete(id);
      fetchSocios();
      return true;
    } catch (err) {
      setError(err.message || 'Erro ao excluir sócio');
      console.error('Erro ao excluir sócio:', err);
      throw err;
    }
  };

  return (
    <SocioContext.Provider
      value={{
        socios,
        totalSocios,
        loading,
        error,
        filtros,
        setFiltros,
        fetchSocios,
        countSocios,
        getSocio,
        createSocio,
        updateSocio,
        deleteSocio
      }}
    >
      {children}
    </SocioContext.Provider>
  );
};