import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // 👈 replace with your backend port, e.g. 3000
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});