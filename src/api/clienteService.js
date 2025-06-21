import apiClient from './axiosConfig';

export const getAllClientes = () => {
    return apiClient.get('/clientes');
};

export const createCliente = (cliente) => {
    return apiClient.post('/clientes', cliente);
};

export const getClienteByDni = (dni) => {
    return apiClient.get(`/clientes/${dni}`);
};

export const updateCliente = (dni, cliente) => {
    return apiClient.put(`/clientes/${dni}`, cliente);
};

export const deleteCliente = (dni) => {
    return apiClient.delete(`/clientes/${dni}`);
};