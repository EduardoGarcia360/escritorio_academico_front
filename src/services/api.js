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
                return { status: 500, data: { status: 'ERROR', message: 'Error en la solicitud GET' } };
            }

            // Descifrar el payload si está presente
            const decryptedData = data.payload ? descifrarObjeto(data.payload) : data;
            // console.log('DECRYPTED GET', decryptedData)

            return { data: decryptedData, status: response.status };
        } catch (error) {
            console.error('Error en GET:', error);
            return { status: 500, data: { status: 'ERROR', message: error.message } }
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
                return { status: 500, data: { status: 'ERROR', message: 'Error en la solicitud POST' } };
            }

            // Descifrar el payload si está presente
            const decryptedData = responseData.payload ? descifrarObjeto(responseData.payload) : responseData;

            return { data: decryptedData, status: response.status };
        } catch (error) {
            console.error('Error en POST:', error);
            return { status: 500, data: { status: 'ERROR', message: error.message } }
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
                return { status: 500, data: { status: 'ERROR', message: 'Error en la solicitud PUT' } };
            }

            // Descifrar el payload si está presente
            const decryptedData = responseData.payload ? descifrarObjeto(responseData.payload) : responseData;

            return { data: decryptedData, status: response.status };
        } catch (error) {
            console.error('Error en PUT:', error);
            return { status: 500, data: { status: 'ERROR', message: error.message } }
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
                return { status: 500, data: { status: 'ERROR', message: 'Error en la solicitud DELETE' } };
            }

            // Descifrar el payload si está presente
            const decryptedData = responseData.payload ? descifrarObjeto(responseData.payload) : responseData;

            return { data: decryptedData, status: response.status };
        } catch (error) {
            console.error('Error en DELETE:', error);
            return { status: 500, data: { status: 'ERROR', message: error.message } }
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
                return { status: 500, data: { status: 'ERROR', message: 'Error en la solicitud LOGIN' } };
            }

            // Descifrar el payload si está presente
            const decryptedData = responseData.payload ? descifrarObjeto(responseData.payload) : responseData;

            return { data: decryptedData, status: response.status };;
        } catch (error) {
            console.error('Error en LOGIN:', error);
            return { status: 500, data: { status: 'ERROR', message: error.message } }
        }
    },

    logout: async () => {
        try {
            const response = await fetch(`${URI}logout`, {
                method: 'POST',
                credentials: 'include', // Habilita envío automático de cookies
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();

            if (!responseData) {
                return { status: 500, data: { status: 'ERROR', message: 'Error en la solicitud LOGOUT' } };
            }

            // Descifrar el payload si está presente
            const decryptedData = responseData.payload ? descifrarObjeto(responseData.payload) : responseData;

            return { data: decryptedData, status: response.status };;
        } catch (error) {
            console.error('Error en LOGOUT:', error);
            return { status: 500, data: { status: 'ERROR', message: error.message } }
        }
    },

    // Solicitud VALIDAR LOGIN
    validateLogin: async () => {
        try {
            const response = await fetch(`${URI}/auth/validatesession`, {
                method: 'GET',
                credentials: 'include', // Habilita envío automático de cookies
            });

            const data = await response.json();
            // console.log('DATA validateLogin', data)

            if (!data) {
                return { status: 500, data: { status: 'ERROR', message: 'Error en la solicitud VALIDAR LOGIN' } };
            }

            // Descifrar el payload si está presente
            const decryptedData = data.payload ? descifrarObjeto(data.payload) : data;
            // console.log('DECRYPTED GET', decryptedData)

            return { data: decryptedData, status: response.status };
        } catch (error) {
            console.error('Error en VALIDAR LOGIN:', error);
            return { status: 500, data: { status: 'ERROR', message: error.message } }
        }
    }
};
