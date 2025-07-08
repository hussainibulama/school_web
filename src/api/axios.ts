import axios from 'axios';
import { AUTH_STORAGE_KEY } from '../contants';
// Your base URL
const baseURL = 'http://localhost:3112/api/v1';

// Create axios instance
const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

// Request Interceptor to add the Bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or sessionStorage, etc.)
    const token = localStorage.getItem(AUTH_STORAGE_KEY);

    // If token exists, add it to the request headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === (401 | 403)) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
