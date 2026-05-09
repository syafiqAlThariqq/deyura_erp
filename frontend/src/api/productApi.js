import api from './axios';

export const getProducts = async () => {
  return await api.get('/products');
};

export const createProduct = async (data) => {
  return await api.post('/products', data);
};

export const deleteProduct = async (id) => {
  return await api.delete(`/products/${id}`);
};