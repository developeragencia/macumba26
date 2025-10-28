import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
};

export const productsAPI = {
  getAll: (params?: any) => api.get('/products', { params }),
  getById: (id: string) => api.get(`/products/${id}`),
  getBySlug: (slug: string) => api.get(`/products/slug/${slug}`),
  getFeatured: () => api.get('/products/featured'),
  getRelated: (id: string) => api.get(`/products/${id}/related`),
  create: (data: any) => api.post('/products', data),
  update: (id: string, data: any) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id: string) => api.get(`/categories/${id}`),
  getBySlug: (slug: string) => api.get(`/categories/slug/${slug}`),
  getProducts: (id: string, params?: any) => api.get(`/categories/${id}/products`, { params }),
};

export const cartAPI = {
  get: () => api.get('/cart'),
  add: (productId: string, quantity?: number) => api.post('/cart', { productId, quantity }),
  updateQuantity: (itemId: string, quantity: number) =>
    api.put(`/cart/${itemId}`, { quantity }),
  remove: (itemId: string) => api.delete(`/cart/${itemId}`),
  clear: () => api.delete('/cart'),
};

export const ordersAPI = {
  create: (data: any) => api.post('/orders', data),
  getAll: (params?: any) => api.get('/orders', { params }),
  getById: (id: string) => api.get(`/orders/${id}`),
};

export const vendorsAPI = {
  create: (data: any) => api.post('/vendors', data),
  getAll: (params?: any) => api.get('/vendors', { params }),
  getById: (id: string) => api.get(`/vendors/${id}`),
  getBySlug: (slug: string) => api.get(`/vendors/slug/${slug}`),
  getMyStore: () => api.get('/vendors/my-store'),
  getDashboard: () => api.get('/vendors/my-store/dashboard'),
  getMyProducts: (params?: any) => api.get('/vendors/my-store/products', { params }),
  update: (id: string, data: any) => api.put(`/vendors/${id}`, data),
};

export const wishlistAPI = {
  get: () => api.get('/wishlist'),
  add: (productId: string) => api.post('/wishlist', { productId }),
  remove: (productId: string) => api.delete('/wishlist', { data: { productId } }),
};

export const reviewsAPI = {
  create: (data: any) => api.post('/reviews', data),
  getByProduct: (productId: string, params?: any) =>
    api.get(`/reviews/product/${productId}`, { params }),
};

export const paymentsAPI = {
  createPix: (orderId: string, amount: number) => api.post('/payments/pix', { orderId, amount }),
  createStripe: (orderId: string, amount: number) =>
    api.post('/payments/stripe', { orderId, amount }),
  createMercadoPago: (orderId: string, amount: number, description: string) =>
    api.post('/payments/mercadopago', { orderId, amount, description }),
};

export const subscriptionsAPI = {
  getVendorSubscription: (vendorId: string) => api.get(`/subscriptions/vendor/${vendorId}`),
  upgrade: (vendorId: string, plan: string) =>
    api.post('/subscriptions/upgrade', { vendorId, plan }),
  cancel: (vendorId: string) => api.post('/subscriptions/cancel', { vendorId }),
};

export const messagesAPI = {
  send: (receiverId: string, content: string) =>
    api.post('/messages', { receiverId, content }),
  getConversations: () => api.get('/messages/conversations'),
  getConversation: (userId: string) => api.get(`/messages/conversation/${userId}`),
  markAsRead: (messageId: string) => api.put(`/messages/${messageId}/read`),
};

export const notificationsAPI = {
  getAll: (params?: any) => api.get('/notifications', { params }),
  markAsRead: (id: string) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  delete: (id: string) => api.delete(`/notifications/${id}`),
};

export const recommendationsAPI = {
  get: (limit?: number) => api.get('/recommendations', { params: { limit } }),
  getTrending: (limit?: number) => api.get('/recommendations/trending', { params: { limit } }),
};

export const uploadAPI = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadImages: (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return api.post('/upload/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

