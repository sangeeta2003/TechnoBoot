import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const leadService = {
  getLeads: async (filters) => {
    try {
      const response = await api.get('/leads', {
        params: {
          ...filters,
          page: filters.page || 1
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getLeadById: async (id) => {
    try {
      const response = await api.get(`/leads/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createLead: async (leadData) => {
    try {
      const response = await api.post('/leads', leadData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateLead: async (id, leadData) => {
    try {
      const response = await api.put(`/leads/${id}`, leadData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteLead: async (id) => {
    try {
      const response = await api.delete(`/leads/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  exportLeads: async (filters) => {
    try {
      const response = await api.get('/leads/export', {
        params: filters,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};