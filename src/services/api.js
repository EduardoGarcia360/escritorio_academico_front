import axios from 'axios';
import { cifrarObjeto } from './codificar';

// console.log('process.env.REACT_APP_API_BASE_URL', process.env.REACT_APP_API_BASE_URL)
const URI = process.env.REACT_APP_API_BASE_URL;

const apiClient = axios.create({
    baseURL: URI, // URL base de la API
    timeout: 5000, // Tiempo de espera opcional
});

const setAuthorizationHeader = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
    validateStatus: (status) => status < 500, // Considera cualquier estado < 500 como manejable
});

export const api = {
    // Solicitud GET
    get: async (token, endpoint) => {
        try {
            const response = await apiClient.get(endpoint, setAuthorizationHeader(token));
            // console.log('get', response)
            return { data: response.data, status: response.status }; // Retorna los datos de la respuesta
        } catch (error) {
            throw error.response?.data || error.message; // Manejo de errores
        }
    },

    // Solicitud POST
    post: async (token, endpoint, data) => {
        try {
            const response = await apiClient.post(endpoint, cifrarObjeto(data), setAuthorizationHeader(token));
            // console.log('post', response)
            return { data: response.data, status: response.status };
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Solicitud PUT
    put: async (token, endpoint, data) => {
        try {
            const response = await apiClient.put(endpoint, cifrarObjeto(data), setAuthorizationHeader(token));
            // console.log('put', response)
            return { data: response.data, status: response.status };
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Solicitud DELETE
    delete: async (token, endpoint) => {
        try {
            const response = await apiClient.delete(endpoint, setAuthorizationHeader(token));
            // console.log('delete', response)
            return { data: response.data, status: response.status };
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Solicitud LOGIN
    login: async (credenciales) => {
        try {
            const response = await axios.post(`${URI}login`, cifrarObjeto(credenciales));
            if (!response || !response.data) {
                return { status: 'ERROR', message: 'No se obtuvo respuesta' };
            }
            // console.log('solicitud token', response);
            return response.data;
        } catch (error) {
            // Retorna el error en lugar de lanzarlo
            const errorTmp = error.response?.data || error.message
            return errorTmp;
        }
    }
};
