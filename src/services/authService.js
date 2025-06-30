import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth';

export const authService = {
  login: async ({ email, password }) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  },
  register: async ({ name, email, password }) => {
    const res = await axios.post(`${API_URL}/register`, { name, email, password });
    return res.data;
  },
};
