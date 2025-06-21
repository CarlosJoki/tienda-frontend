import apiClient from './axiosConfig';

export const registerVenta = (venta) => {
    return apiClient.post('/ventas', venta);
};

export const getAllVentas = () => {
    return apiClient.get('/ventas');
};

export const getVentaByCodigo = (codigo) => {
    return apiClient.get(`/ventas/${codigo}`);
};