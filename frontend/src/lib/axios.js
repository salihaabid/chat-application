// import axios from 'axios';
// export const axiosInstance = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   withCredentials: true,
// });

import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 👈 use env var
  withCredentials: true,
});
