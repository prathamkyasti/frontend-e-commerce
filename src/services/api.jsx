import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  signup: (userData) => api.post('/signup', userData),
};

// Product APIs
export const productAPI = {
  getProducts: () => api.get('/admin/getproduct'),
  addProduct: (productData) => api.post('/admin/addproduct', productData),
  deleteProduct: (id) => api.delete(`/admin/deleteproduct/${id}`),
  updateProduct: (id, productData) => api.put(`/admin/updateproduct/${id}`, productData),
};

// Cart APIs
export const cartAPI = {
  getCart: () => api.get('/product/'),
  addToCart: (productId, quantity = 1) => api.post('/product/addcart', { productId, quantity }),
  removeFromCart: (productId) => api.post('/product/removecart', { productId }),
};

export default api;
