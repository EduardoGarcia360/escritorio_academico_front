import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function CicloJornadaPrincipal() {
  const [jornadas, setJornadas] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!id) {
      alert("Ciclo escolar no encontrado");
      history.push("/admin/CicloEscolar/CicloEscolarPrincipal");
      return;
    }

    const fetchJornadas = async () => {
      try {
        const params = {
          procedureName: "listadoJornadaCicloEscolar",
          params: ["id_ciclo"],
          objParams: { id_ciclo: id },
        };
        const response = await api.post("execute-procedure", params);
        setJornadas(response.data.results);
      } catch (error) {
        console.error("Error al obtener las jornadas del ciclo escolar:", error);
        alert("No se pudieron cargar las jornadas del ciclo escolar.");
        history.push("/admin/CicloEscolar/CicloEscolarPrincipal");
      }
    };

    fetchJornadas();
  }, [id, history]);

  const handleNuevo = () => {
    history.push(`/admin/CicloEscolarJornada/CicloEscolarJornadaGestionar/${id}`);
  };

  const handleEliminar = async (jornadaId) => {
    const confirmar = window.confirm("¿Está seguro que desea eliminar esta jornada?");
    if (confirmar) {
      try {
        const response = await api.delete(`jornadacicloescolar/${jornadaId}`);
        if (response.status === 200) {
            alert("Jornada eliminada correctamente.");
            setJornadas((prevJornadas) => prevJornadas.filter((jornada) => jornada.id_jornada_ciclo !== jornadaId));
        } else {
            alert(response.data.message)
        }
      } catch (error) {
        console.error("Error al eliminar la jornada:", error);
        alert("Ocurrió un error al intentar eliminar la jornada.");
      }
    }
  };

  const handleRegresar = () => {
    history.push("/admin/CicloEscolar/CicloEscolarPrincipal");
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                Jornadas del Ciclo Escolar
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
                  Jornada Asignada
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {jornadas.map((jornada) => (
                <tr key={jornada.id_jornada_ciclo}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {jornada.desc_jornada}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleEliminar(jornada.id_jornada_ciclo)}
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
