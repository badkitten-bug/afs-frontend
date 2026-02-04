import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ventasAPI = {
  getDashboard: (filtros?: any) => api.get('/ventas/dashboard', { params: filtros }),
  getVentasPorSucursal: (filtros?: any) => api.get('/ventas/por-sucursal', { params: filtros }),
  getVentasRecientes: (filtros?: any) => api.get('/ventas/recientes', { params: filtros }),
  getSucursales: () => api.get('/ventas/sucursales'),
  getFormasPago: () => api.get('/ventas/formas-pago'),
  getYears: () => api.get('/ventas/anios'),
};

export default api;
