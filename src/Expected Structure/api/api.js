import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // 👈 replace with your backend port, e.g. 3000
  withCredentials: true,
});


