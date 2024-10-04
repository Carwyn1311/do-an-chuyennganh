import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://chat-api-backend-x4dl.onrender.com',
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token) {
      if (!config.headers) {
        config.headers = {} as AxiosHeaders; // Ép kiểu headers cho đúng với AxiosHeaders
      }
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized, redirecting to login...');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
