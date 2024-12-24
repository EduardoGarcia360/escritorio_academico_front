import { cifrarObjeto } from './codificar';

// Base URL de la API desde las variables de entorno
const URI = process.env.REACT_APP_API_BASE_URL;

export const api = {
    // Solicitud GET
    get: async (endpoint) => {
        try {
            const response = await fetch(`${URI}${endpoint}`, {
                method: 'GET',
                credentials: 'include', // Habilita envío automático de cookies
            });

            const data = await response.json();

            if (!response.ok) {
                return { status: 'ERROR', code: response.status, message: data.message || 'Error en la solicitud GET' };
            }

            return { data, status: response.status };
        } catch (error) {
            console.error('Error en GET:', error);
            throw error;
        }
    },

    // Solicitud POST
    post: async (endpoint, data) => {
        try {
            const response = await fetch(`${URI}${endpoint}`, {
                method: 'POST',
                credentials: 'include', // Habilita envío automático de cookies
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cifrarObjeto(data)), // Cifra y envía los datos
            });

            const responseData = await response.json();

            if (!response.ok) {
                return { status: 'ERROR', code: response.status, message: data.message || 'Error en la solicitud GET' };
            }

            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('Error en POST:', error);
            throw error;
        }
    },

    // Solicitud PUT
    put: async (endpoint, data) => {
        try {
            const response = await fetch(`${URI}${endpoint}`, {
                method: 'PUT',
                credentials: 'include', // Habilita envío automático de cookies
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cifrarObjeto(data)), // Cifra y envía los datos
            });

            const responseData = await response.json();

            if (!response.ok) {
                return { status: 'ERROR', code: response.status, message: responseData.message || 'Error en la solicitud GET' };
            }

            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('Error en PUT:', error);
            throw error;
        }
    },

    // Solicitud DELETE
    delete: async (endpoint) => {
        try {
            const response = await fetch(`${URI}${endpoint}`, {
                method: 'DELETE',
                credentials: 'include', // Habilita envío automático de cookies
            });

            const responseData = await response.json();

            if (!response.ok) {
                return { status: 'ERROR', code: response.status, message: responseData.message || 'Error en la solicitud GET' };
            }

            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('Error en DELETE:', error);
            throw error;
        }
    },

    // Solicitud LOGIN
    login: async (credenciales) => {
        try {
            const response = await fetch(`${URI}login`, {
                method: 'POST',
                credentials: 'include', // Habilita envío automático de cookies
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cifrarObjeto(credenciales)), // Cifra y envía las credenciales
            });

            const responseData = await response.json();

            if (!response.ok) {
                return { status: 'ERROR', code: response.status, message: responseData.message || 'Error en la solicitud GET' };
            }

            return responseData;
        } catch (error) {
            console.error('Error en LOGIN:', error);
            return { status: 'ERROR', message: error.message || 'Error interno' };
        }
    },
};
