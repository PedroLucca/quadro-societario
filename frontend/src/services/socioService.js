import api from './api';

const ENDPOINT = '/socios';

export const socioService = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    return api.get(`${ENDPOINT}?${params.toString()}`);
  },

  getTotal: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    return api.get(`${ENDPOINT}/total?${params.toString()}`);
  },
  
  getById: async (id) => {
    return api.get(`${ENDPOINT}/${id}`);
  },
  
  create: async (data) => {
    return api.post(ENDPOINT, data);
  },
  
  update: async (id, data) => {
    return api.put(`${ENDPOINT}/${id}`, data);
  },
  
  delete: async (id) => {
    return api.delete(`${ENDPOINT}/${id}`);
  }
};