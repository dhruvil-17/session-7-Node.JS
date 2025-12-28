import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  createAdmin: () => api.post('/auth/create-admin'),
};

// Blog API
export const blogAPI = {
  getAllBlogs: () => api.get('/blogs'),
  getBlogBySlug: (slug) => api.get(`/blogs/${slug}`),
  createBlog: (blogData) => api.post('/blogs', blogData),
  updateBlog: (id, blogData) => api.put(`/blogs/${id}`, blogData),
  deleteBlog: (id) => api.delete(`/blogs/${id}`),
  searchBlogs: (query) => api.get(`/blogs/search?q=${query}`),
};

// Category API
export const categoryAPI = {
  getAllCategories: () => api.get('/categories'),
  createCategory: (categoryData) => api.post('/categories', categoryData),
  updateCategory: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
  deleteCategory: (id) => api.delete(`/categories/${id}`),
};

export default api;