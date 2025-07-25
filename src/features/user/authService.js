import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth';

export const authService = {
  register: async ({ name, email, password }) => {
    const res = await axios.post(`${API_URL}/register`, { name, email, password });
    return res.data;
  },

  login: async ({ email, password }) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data; // Deve conter: { id, name, email, role, token }
  }
};
