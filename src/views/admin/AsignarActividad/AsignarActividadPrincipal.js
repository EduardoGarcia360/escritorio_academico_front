import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function AsignarActividadPrincipal() {
  const [actividades, setActividades] = useState([]);
  const { idCiclo, idJornadaCiclo, idGrado } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!idCiclo || !idJornadaCiclo || !idGrado) {
      alert("Información incompleta para acceder a esta pantalla");
      history.push("/admin/CicloEscolar/CicloEscolarPrincipal");
      return;
    }

    const fetchActividades = async () => {
      try {
        const params = {
          procedureName: "listadoActividadesPorGrado",
          params: ["id_colegio", "id_grado"],
          objParams: { id_grado: idGrado },
        };
        const response = await api.post("execute-procedure", params);
        setActividades(response.data.results);
      } catch (error) {
        console.error("Error al obtener las actividades asignadas:", error);
        alert("No se pudieron cargar las actividades asignadas.");
        history.push("/admin/CicloEscolar/CicloEscolarPrincipal");
      }
    };

    fetchActividades();
  }, [idCiclo, idJornadaCiclo, idGrado, history]);

  const handleRegresar = () => {
    history.push(`/admin/Grado/GradoPrincipal/${idCiclo}/jornada/${idJornadaCiclo}`);
  };

  const handleNuevo = () => {
    history.push(`/admin/AsignarActividad/AsignarActividadGestionar/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}`);
  };

  const handleEliminar = async (asignacionId) => {
    const confirmar = window.confirm("¿Está seguro que desea eliminar esta asignación?");
    if (confirmar) {
      try {
        const response = await api.delete(`asignacionesgastoextra/${asignacionId}`);
        if (response.status === 200) {
          alert("Asignación eliminada correctamente.");
          setActividades((prevActividades) => prevActividades.filter((actividad) => actividad.id_asignacion !== asignacionId));
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error al eliminar la asignación:", error);
        alert("Ocurrió un error al intentar eliminar la asignación.");
      }
    }
  };

  const adjustDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString();
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                Listado de Actividades Asignadas
              </h3>
            </div>
            <div className="w-full flex justify-end px-2 mt-4">
              <button
                className="bg-lightBlue-500 text-white px-4 py-2 rounded flex items-center ml-2"
                onClick={handleRegresar}
              >
                Regresar
              </button>
              <button
                className="bg-emerald-500 text-white px-4 py-2 rounded flex items-center ml-2"
                onClick={handleNuevo}
              >
                Nueva Actividad
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto mt-4">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Nombre Gasto
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Monto
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Descripción
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Fecha Asignación
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {actividades.map((actividad) => (
                <tr key={actividad.id_asignacion}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {actividad.nombre_gasto}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {actividad.monto}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {actividad.descripcion}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {adjustDate(actividad.fecha_asignacion)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleEliminar(actividad.id_asignacion)}
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
