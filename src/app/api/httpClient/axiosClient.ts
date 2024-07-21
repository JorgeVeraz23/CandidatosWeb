// import axios, { AxiosInstance } from 'axios';
// import { URL_API } from "../urls/urls";

// const axiosClient: AxiosInstance = axios.create({
//   baseURL: URL_API
// });


// export default axiosClient;

// src/api/axiosClient.ts

import axios, { AxiosInstance } from 'axios';
import { URL_API } from "../urls/urls";

// Crear una instancia de Axios
const axiosClient: AxiosInstance = axios.create({
  baseURL: URL_API
});

// Interceptor de solicitudes
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
