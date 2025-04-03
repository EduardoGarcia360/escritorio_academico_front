import { cifrarObjeto, descifrarObjeto } from './codificar';
import { CapacitorHttp } from '@capacitor/core';
import capacitorStorage from './capacitorStorage';

// Base URL de la API desde las variables de entorno
const URI = process.env.REACT_APP_API_BASE_URL;

const handleUnauthorizedError = () => {
    window.location.href = '/auth/login';
};

export const api = {
    // Subida de archivos (multipart/form-data sin cifrado)
    doUpload: async (endpoint, formData) => {
        try {
            const response = await fetch(`${URI}${endpoint}`, {
                method: 'POST',
                credentials: 'include', // si manejas sesiones con cookies
                body: formData, // sin stringify ni headers personalizados
            });

            if (response.status === 403) {
                handleUnauthorizedError();
            }

            const responseData = await response.json();

            if (!responseData) {
                return { status: 500, data: { status: 'ERROR', message: 'Error en la solicitud UPLOAD' } };
            }

            // Descifrar el payload si está presente
            const decryptedData = responseData.payload ? descifrarObjeto(responseData.payload) : responseData;

            return { data: decryptedData, status: response.status };
        } catch (error) {
            console.error('Error en doUpload:', error);
            return { status: 500, data: { status: 'ERROR', message: error.message } };
        }
    },

    // Solicitud GET
    get: async (endpoint) => {
        try {
            const authToken = await capacitorStorage.capacitorGetItem('session');
            const response = await CapacitorHttp.get({
                url: `${URI}${endpoint}`,
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": authToken || null
                }
            });
    
            if (response.status === 403) {
                handleUnauthorizedError();
            }
    
            if (!response || !response.data) {
                return { status: 500, data: { status: 'ERROR', message: 'Error en la solicitud GET' } };
            }
    
            const decryptedData = response.data.payload ? descifrarObjeto(response.data.payload) : response.data;
    
            return { data: decryptedData, status: response.status || 200 };
        } catch (error) {
            console.error('Error en GET:', error);
            return { status: 500, data: { status: 'ERROR', message: error.message } };
        }
    },

    // Solicitud POST
    post: async (endpoint, data) => {
        try {
            const authToken = await capacitorStorage.capacitorGetItem('session');
            const encryptedData = JSON.stringify(cifrarObjeto(data));
            const response = await CapacitorHttp.post({
                url: `${URI}${endpoint}`,
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": authToken || null
                },
                data: encryptedData
            });
    
            if (response.status === 403) {
                handleUnauthorizedError();
            }
    
            if (!response || !response.data) {
                return { status: 500, data: { status: 'ERROR', message: 'Error en la solicitud POST' } };
            }
    
            const decryptedData = response.data.payload ? descifrarObjeto(response.data.payload) : response.data;
    
            return { data: decryptedData, status: response.status || 200 };
        } catch (error) {
            console.error('Error en POST:', error);
            return { status: 500, data: { status: 'ERROR', message: error.message } };
        }
    },

    // Solicitud PUT
    put: async (endpoint, data) => {
        try {
            const authToken = await capacitorStorage.capacitorGetItem('session');
            const encryptedData = JSON.stringify(cifrarObjeto(data));
            const response = await CapacitorHttp.put({
                url: `${URI}${endpoint}`,
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": authToken || null
                },
                data: encryptedData
            });

            if (response.status === 403) {
                handleUnauthorizedError();
            }

            if (!response || !response.data) {
                return { status: 500, data: { status: 'ERROR', message: 'Error en la solicitud PUT' } };
            }

            const decryptedData = response.data.payload ? descifrarObjeto(response.data.payload) : response.data;

            return { data: decryptedData, status: response.status || 200 };
        } catch (error) {
            console.error('Error en PUT:', error);
            return { status: 500, data: { status: 'ERROR', message: error.message } };
        }
    },

    // Solicitud DELETE
    delete: async (endpoint) => {
        try {
            const authToken = await capacitorStorage.capacitorGetItem('session');
            const response = await CapacitorHttp.del({
                url: `${URI}${endpoint}`,
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": authToken || null
                }
            });

            if (response.status === 403) {
                handleUnauthorizedError();
            }

            if (!response || !response.data) {
                return { status: 500, data: { status: 'ERROR', message: 'Error en la solicitud DELETE' } };
            }

            // Descifrar el payload si está presente
            const decryptedData = response.data.payload ? descifrarObjeto(response.data.payload) : response.data;

            return { data: decryptedData, status: response.status || 200 };
        } catch (error) {
            console.error('Error en DELETE:', error);
            return { status: 500, data: { status: 'ERROR', message: error.message } };
        }
    },

    // Solicitud LOGIN
    login: async (credenciales) => {
        try {
            const encryptedCredentials = cifrarObjeto(credenciales);
    
            const response = await CapacitorHttp.post({
                url: `${URI}login`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: encryptedCredentials, // Enviar credenciales cifradas
            });

            if (!response || !response.data) {
                return { status: 500, data: { status: 'ERROR', message: 'Error en la solicitud LOGIN' } };
            }

            // 🔥 Extraer y guardar la cookie manualmente
            const setCookieHeader = response.headers["set-cookie"];
            if (setCookieHeader) {
                await capacitorStorage.capacitorSetItem('session', setCookieHeader);
            }

            // Descifrar el payload si está presente
            const decryptedData = response.data.payload ? descifrarObjeto(response.data.payload) : response.data;

            return { data: decryptedData, status: response.status };
        } catch (error) {
            console.error('Error en LOGIN:', error);
            return { status: 500, data: { status: 'ERROR', message: error.message } };
        }
    },

    // Solicitud LOGOUT
    logout: async () => {
        try {
            const response = await CapacitorHttp.post({
                url: `${URI}logout`,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response || !response.data) {
                return { status: 500, data: { status: 'ERROR', message: 'Error en la solicitud LOGOUT' } };
            }

            // Descifrar el payload si está presente
            const decryptedData = response.data.payload ? descifrarObjeto(response.data.payload) : response.data;

            return { data: decryptedData, status: response.status || 200 };
        } catch (error) {
            console.error('Error en LOGOUT:', error);
            return { status: 500, data: { status: 'ERROR', message: error.message } };
        }
    },

    // Solicitud VALIDAR LOGIN
    validateLogin: async () => {
        try {
            const authToken = await capacitorStorage.capacitorGetItem('session');
            const response = await CapacitorHttp.get({
                url: `${URI}auth/validatesession`,
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": authToken || null
                }
            });

            if (!response || !response.data) {
                return { status: 500, data: { status: 'ERROR', message: 'Error en la solicitud VALIDAR LOGIN' } };
            }

            // Descifrar el payload si está presente
            const decryptedData = response.data.payload ? descifrarObjeto(response.data.payload) : response.data;

            return { data: decryptedData, status: response.status || 200 };
        } catch (error) {
            console.error('Error en VALIDAR LOGIN:', error);
            return { status: 500, data: { status: 'ERROR', message: error.message } };
        }
    }
};
