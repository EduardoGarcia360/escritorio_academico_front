import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "services/api";

export default function NivelEducacionPrincipal() {
  const [niveles, setNiveles] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchNiveles = async () => {
      try {
        const response = await api.get("niveleducacion/");
        setNiveles(response.data);
      } catch (error) {
        console.error("Error al obtener los niveles de educación:", error);
        alert("No se pudieron cargar los niveles de educación.");
      }
    };

    fetchNiveles();
  }, []);

  const handleNuevo = () => {
    history.push("/admin/NivelEducacion/NivelEducacionGestionar");
  };

  const handleEditar = (id) => {
    history.push(`/admin/NivelEducacion/NivelEducacionGestionar/${id}`);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Está seguro que desea eliminar este registro?");
    if (confirmar) {
      try {
        const response = await api.delete(`niveleducacion/${id}`);
        console.log('response', response)
        if (response.status === 200) {
          alert("Nivel de educación eliminado correctamente.");
          setNiveles((prevNiveles) => prevNiveles.filter((nivel) => nivel.id_nivel !== id));
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error al eliminar nivel de educación:", error);
        alert("Ocurrió un error al intentar eliminar el nivel de educación.");
      }
    }
  };

  const handleVerJornadas = (id) => {
    history.push(`/admin/Jornada/JornadaPrincipal/${id}`);
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                Listado de Niveles de Educación
              </h3>
            </div>
            <div className="w-full flex justify-end px-2 mt-4">
              <button
                className="bg-emerald-500 text-white px-4 py-2 rounded flex items-center ml-2"
                onClick={handleNuevo}
              >
                Nuevo Nivel
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto mt-4">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Nombre
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Descripción
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Fecha Creación
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Jornadas
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {niveles.map((nivel) => (
                <tr key={nivel.id_nivel}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {nivel.nombre}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {nivel.descripcion}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {new Date(nivel.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-lightBlue-500 text-white px-3 py-1 rounded-full flex items-center"
                      onClick={() => handleVerJornadas(nivel.id_nivel)}
                    >
                      <i className="fas fa-stopwatch mr-2"></i>
                      {nivel.cantidad_jornada}
                    </button>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-lightBlue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEditar(nivel.id_nivel)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleEliminar(nivel.id_nivel)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
