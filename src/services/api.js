import { cifrarObjeto, descifrarObjeto } from './codificar';

// Base URL de la API desde las variables de entorno
const URI = process.env.REACT_APP_API_BASE_URL;

const handleUnauthorizedError = () => {
    window.location.href = '/auth/login';
};

export const api = {
    // Solicitud GET
    get: async (endpoint) => {
        try {
            const response = await fetch(`${URI}${endpoint}`, {
                method: 'GET',
                credentials: 'include', // Habilita envío automático de cookies
            });

            if (response.status === 403) {
                handleUnauthorizedError();
            }

            const data = await response.json();
            // console.log('DATA GET', data)

            if (!data) {
                return { status: 'ERROR', code: 500, message: 'Error en la solicitud GET' };
            }

            // Descifrar el payload si está presente
            const decryptedData = data.payload ? descifrarObjeto(data.payload) : data;
            // console.log('DECRYPTED GET', decryptedData)

            return { data: decryptedData, status: response.status };
        } catch (error) {
            console.error('Error en GET:', error);
            return { status: 'ERROR', code: 500, message: error.message }
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

            if (response.status === 403) {
                handleUnauthorizedError();
            }

            const responseData = await response.json();

            if (!responseData) {
                return { status: 'ERROR', code: 500, message: 'Error en la solicitud POST' };
            }

            // Descifrar el payload si está presente
            const decryptedData = responseData.payload ? descifrarObjeto(responseData.payload) : responseData;

            return { data: decryptedData, status: response.status };
        } catch (error) {
            console.error('Error en POST:', error);
            return { status: 'ERROR', code: 500, message: error.message }
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

            if (response.status === 403) {
                handleUnauthorizedError();
            }

            const responseData = await response.json();

            if (!responseData) {
                return { status: 'ERROR', code: 500, message: 'Error en la solicitud PUT' };
            }

            // Descifrar el payload si está presente
            const decryptedData = responseData.payload ? descifrarObjeto(responseData.payload) : responseData;

            return { data: decryptedData, status: response.status };
        } catch (error) {
            console.error('Error en PUT:', error);
            return { status: 'ERROR', code: 500, message: error.message }
        }
    },

    // Solicitud DELETE
    delete: async (endpoint) => {
        try {
            const response = await fetch(`${URI}${endpoint}`, {
                method: 'DELETE',
                credentials: 'include', // Habilita envío automático de cookies
            });

            if (response.status === 403) {
                handleUnauthorizedError();
            }

            const responseData = await response.json();

            if (!responseData) {
                return { status: 'ERROR', code: 500, message: 'Error en la solicitud DELETE' };
            }

            // Descifrar el payload si está presente
            const decryptedData = responseData.payload ? descifrarObjeto(responseData.payload) : responseData;

            return { data: decryptedData, status: response.status };
        } catch (error) {
            console.error('Error en DELETE:', error);
            return { status: 'ERROR', code: 500, message: error.message }
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

            if (!responseData) {
                return { status: 'ERROR', code: 500, message: 'Error en la solicitud LOGIN' };
            }

            // Descifrar el payload si está presente
            const decryptedData = responseData.payload ? descifrarObjeto(responseData.payload) : responseData;

            return { data: decryptedData, status: response.status };;
        } catch (error) {
            console.error('Error en LOGIN:', error);
            return { status: 'ERROR', code: 500, message: error.message }
        }
    },
};
