/**
 * Guarda un valor en una cookie con opciones de seguridad.
 *
 * @param {string} name - Nombre de la cookie.
 * @param {string} value - Valor que se almacenará en la cookie.
 * @param {number} [days=1] - Número de días antes de que la cookie expire (por defecto, 1 día).
 */
const setCookie = (name, value, days = 1) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Expira en X días
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}${expires}; path=/; Secure; SameSite=Lax`;
};

/**
 * Obtiene el valor almacenado en una cookie específica.
 *
 * @param {string} name - Nombre de la cookie a recuperar.
 * @returns {string|null} - Retorna el valor de la cookie si existe, o `null` si no se encuentra.
 */
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
};

module.exports = {
    setCookie,
    getCookie,
};
