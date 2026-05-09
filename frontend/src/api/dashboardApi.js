import axios from 'axios';

const API = 'http://localhost:5000/api/dashboard';

export const getDashboard = async (month) => {
  return await axios.get(`${API}?month=${month}`);
};

export const refreshDashboard = async () => {
  return await axios.post(`${API}/refresh`);
};