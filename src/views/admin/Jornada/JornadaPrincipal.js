import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function JornadaPrincipal() {
  const [jornadas, setJornadas] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!id) {
      alert("Nivel de educación no encontrado");
      history.push("/admin/NivelEducacion/NivelEducacionPrincipal");
      return;
    }

    const fetchJornadas = async () => {
      try {
        const response = await api.get(`jornadas/niveleducacion/${id}`);
        console.log('response', response)
        setJornadas(response.data);
      } catch (error) {
        console.error("Error al obtener las jornadas:", error);
        alert("No se pudieron cargar las jornadas.");
        history.push("/admin/NivelEducacion/NivelEducacionPrincipal");
      }
    };

    fetchJornadas();
  }, [id, history]);

  

  const handleNuevo = () => {
    history.push(`/admin/Jornada/JornadaGestionar/${id}/jornada/`);
  };

  const handleEditar = (jornadaId) => {
    history.push(`/admin/Jornada/JornadaGestionar/${id}/jornada/${jornadaId}`);
  };

  const handleEliminar = async (jornadaId) => {
    const confirmar = window.confirm("¿Está seguro que desea eliminar este registro?");
    if (confirmar) {
      try {
        const response = await api.delete(`jornadas/${jornadaId}`);
        console.log('response', response)
        if (response.status === 200) {
            alert("Jornada eliminada correctamente.");
            setJornadas((prevJornadas) => prevJornadas.filter((jornada) => jornada.id_jornada !== jornadaId));
        } else {
            alert(response.data.message);
        }
      } catch (error) {
        console.error("Error al eliminar jornada:", error);
        alert("Ocurrió un error al intentar eliminar la jornada.");
      }
    }
  };

  const handleRegresar = () => {
    history.push("/admin/NivelEducacion/NivelEducacionPrincipal");
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                Listado de Jornadas
              </h3>
            </div>
            <div className="w-full flex justify-end px-2 mt-4">
              <button
                className="bg-emerald-500 text-white px-4 py-2 rounded flex items-center ml-2"
                onClick={handleNuevo}
              >
                Nueva Jornada
              </button>
              <button
                className="bg-lightBlue-500 text-white px-4 py-2 rounded flex items-center ml-2"
                onClick={handleRegresar}
              >
                Regresar
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
                  Horario Inicio
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Horario Fin
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Fecha Creación
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {jornadas.map((jornada) => (
                <tr key={jornada.id_jornada}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {jornada.nombre}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {jornada.horario_inicio}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {jornada.horario_fin}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {jornada.createdAt}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-lightBlue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEditar(jornada.id_jornada)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleEliminar(jornada.id_jornada)}
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
