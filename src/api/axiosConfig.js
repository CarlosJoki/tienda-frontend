import axios from 'axios';

// Crea una instancia de Axios con la configuración base
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;