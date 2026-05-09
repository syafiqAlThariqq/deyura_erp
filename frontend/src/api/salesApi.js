import api from './axios';

export const getSales = async () => {
  return await api.get('/sales');
};

export const createSale = async (data) => {
  return await api.post('/sales', data);
};