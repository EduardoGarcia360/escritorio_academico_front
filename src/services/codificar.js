const CryptoJS = require("crypto-js");

// Clave secreta para el cifrado y descifrado
// console.log('process.env.REACT_APP_CRYPTO_JS', process.env.REACT_APP_CRYPTO_JS)
const SECRET_KEY = process.env.REACT_APP_CRYPTO_JS;

// Bandera para habilitar o deshabilitar el cifrado
const enableEncrypt = process.env.REACT_APP_ENABLE_ENCRYPT === 'TRUE';

/**
 * Función para cifrar un objeto
 * @param {Object} data - El objeto que deseas cifrar
 * @returns {String|Object} - El objeto cifrado como string, o el objeto original si el cifrado está deshabilitado
 */
const cifrarObjeto = (data) => {
    if (!enableEncrypt) {
        return data; // Si el cifrado está deshabilitado, devuelve el objeto original
    }
    // Convertir el objeto a JSON y cifrarlo
    const jsonString = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
    return { payload: encryptedData }; // Retorna el objeto con el payload cifrado
};

/**
 * Función para cifrar un objeto
 * @param {Object} data - El objeto que deseas cifrar
 * @returns {String} - El objeto cifrado como string
 */
const cifrarObjetoGeneral = (data) => {
    const jsonString = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
    return encryptedData;
}

/**
 * Función para descifrar un objeto
 * @param {String} encryptedPayload - El string cifrado del objeto
 * @returns {Object} - El objeto original descifrado
 */
const descifrarObjeto = (encryptedPayload) => {
    // Descifrar la cadena cifrada
    const bytes = CryptoJS.AES.decrypt(encryptedPayload, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    try {
        // Convertir el string descifrado a un objeto JSON
        return JSON.parse(decryptedData);
    } catch (error) {
        throw new Error("Error al descifrar los datos: el formato no es válido.");
    }
};

module.exports = {
    cifrarObjeto,
    descifrarObjeto,
    cifrarObjetoGeneral,
};
