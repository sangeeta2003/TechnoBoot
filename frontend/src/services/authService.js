import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    // You might want to decode the JWT token here to get user info
    // or make an API call to get the current user's details
    return token;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};