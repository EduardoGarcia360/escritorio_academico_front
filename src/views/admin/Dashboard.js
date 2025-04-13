import React, { useState, useEffect } from "react";
import { api } from "services/api";

export default function Dashboard() {
  const [hasMounted, setHasMounted] = useState(false);
  const [colegioData, setColegioData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    correo_electronico: "",
    logo: ""
  });
  const [usuarioData, setUsuarioData] = useState({
    nombre_completo: "",
    correo_electronico: "",
    rol: ""
  });
  const urlFileServer = process.env.REACT_APP_URL_FILE_SERVER;

  const getColegio = async () => {
    const response = await api.get('colegios/')
    // console.log('Colegio', response)
    setColegioData(response.data)
  }

  const getMiUsuario = async () => {
    const response = await api.get('usuarios/miusuario')
    // console.log('Usuario', response)
    setUsuarioData(response.data)
  }

  useEffect(() => {
    if (hasMounted) {
      getColegio();
      getMiUsuario();
    }
  }, [hasMounted]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words mb-6 h-60 rounded-lg bg-blueGray-100 border-0">
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
          {/* Título */}
          <h1 className="text-3xl font-bold text-gray-800 mb-8 uppercase">Escritorio Académico</h1>

          {/* Card del colegio */}
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center mb-8">
            {/* Datos del colegio */}
            <div className="text-gray-700 space-y-2 w-full md:w-2/3">
              <h2 className="text-xl font-semibold uppercase">{colegioData.nombre}</h2>
              <p><span className="font-medium">Dirección:</span> {colegioData.direccion}</p>
              <p><span className="font-medium">Teléfono:</span> {colegioData.telefono}</p>
              <p><span className="font-medium">Correo:</span> {colegioData.correo_electronico}</p>
            </div>
          </div>

          {/* Card del usuario */}
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Datos del Usuario</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="font-medium">Nombre completo:</p>
                <p>{usuarioData.nombre_completo}</p>
              </div>
              <div>
                <p className="font-medium">Correo:</p>
                <p>{usuarioData.correo_electronico}</p>
              </div>
              <div>
                <p className="font-medium">Rol:</p>
                <p>{usuarioData.rol === 'A' ? 'Administrador' : (usuarioData.rol === 'D' ? 'Docente' : (usuarioData.rol === 'P' ? 'Padre de Familia' : 'Otro'))}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-8">
            <div className="flex justify-center items-center overflow-hidden" style={{ maxWidth: '500px', maxHeight: '500px' }}>
              <img
                src={`${urlFileServer}${colegioData.logo}`}
                alt="Logo del colegio"
                className="object-contain w-auto h-auto max-w-[500px] max-h-[500px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
