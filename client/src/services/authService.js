import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const authService = {
  async login(credentials) {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response.data;
  },

  async register(userData) {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  },

  async getCurrentUser() {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
}; 