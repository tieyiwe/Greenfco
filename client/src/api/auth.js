import api from './client';

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (data) => api.post('/auth/register', data);
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const getMe = () => api.get('/auth/me');
