import apiClient from './axiosConfig';

export const getAllProductos = () => {
    return apiClient.get('/productos');
};

export const createProducto = (producto) => {
    return apiClient.post('/productos', producto);
};

export const getProductoByCodigo = (codigo) => {
    return apiClient.get(`/productos/${codigo}`);
};

export const updateProducto = (codigo, producto) => {
    return apiClient.put(`/productos/${codigo}`, producto);
};

export const deleteProducto = (codigo) => {
    return apiClient.delete(`/productos/${codigo}`);
};