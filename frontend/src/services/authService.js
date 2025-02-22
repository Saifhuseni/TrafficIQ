import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; 

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data; // Token expected in response
};

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data; // Registration confirmation
};

export default {
  login,
  register,
};
