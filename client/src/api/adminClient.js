import axios from 'axios';

const adminClient = axios.create({
  baseURL: '/api/admin/data',
  headers: { 'Content-Type': 'application/json' },
});

adminClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('greenfco_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

adminClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('greenfco_admin_token');
      localStorage.removeItem('greenfco_admin_session');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default adminClient;
