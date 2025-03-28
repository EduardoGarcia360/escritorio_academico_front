export const formatearFechaDateTime = (fecha) => {
    if (!fecha) return '';
    const date = new Date(fecha);
    
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
    const anio = date.getFullYear();
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    const segundos = String(date.getSeconds()).padStart(2, '0');

    return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
};

export const getFormatRandomName = (module) => {
    const getRandomId = () => {
      return String(Math.floor(Math.random() * 10000))
    }
    const currentDate = new Date()
    let fixName = `${module}_${currentDate.getFullYear()}`
    fixName += `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`
    fixName += `${currentDate.getDate().toString().padStart(2, '0')}`
    fixName += `_${currentDate.getHours().toString().padStart(2, '0')}`
    fixName += `${currentDate.getMinutes().toString().padStart(2, '0')}`
    fixName += `${currentDate.getSeconds().toString().padStart(2, '0')}`
    fixName += `_${currentDate.getMilliseconds().toString()}`
    fixName += `_${getRandomId()}`
    return fixName
};

export const adjustDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return date.toLocaleDateString();
};