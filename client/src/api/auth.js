import api from './client';

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (data) => api.post('/auth/register', data);
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const resetPassword = (token, password) => api.post('/auth/reset-password', { token, password });
export const adminForgotPassword = (email) => api.post('/admin/auth/forgot-password', { email });
export const adminResetPassword = (token, newPassword) => api.post('/admin/auth/reset-password', { token, new_password: newPassword });
export const getMe = () => api.get('/auth/me');
