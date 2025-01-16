import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function AsignarBusPrincipal() {
  const [buses, setBuses] = useState([]);
  const { idCiclo, idJornadaCiclo, idGrado, idAsignacion } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!idCiclo || !idJornadaCiclo || !idGrado || !idAsignacion) {
      alert("Información incompleta para acceder a esta pantalla");
      history.push("/admin/CicloEscolar/CicloEscolarPrincipal");
      return;
    }

    const fetchBuses = async () => {
      try {
        const params = {
          procedureName: "listadoBusesPorActividad",
          params: ["id_colegio", "id_asignacion"],
          objParams: { id_asignacion: idAsignacion },
        };
        const response = await api.post("execute-procedure", params);
        setBuses(response.data.results);
      } catch (error) {
        console.error("Error al obtener los buses asignados:", error);
        alert("No se pudieron cargar los buses asignados.");
        history.push("/admin/CicloEscolar/CicloEscolarPrincipal");
      }
    };

    fetchBuses();
  }, [idCiclo, idJornadaCiclo, idGrado, idAsignacion, history]);

  const handleRegresar = () => {
    history.push(`/admin/AsignarActividad/AsignarActividadPrincipal/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}`);
  };

  const handleNuevo = () => {
    history.push(`/admin/AsignarBus/AsignarBusGestionar/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}/actividad/${idAsignacion}/transporte/`);
  };

  const handleEditar = (idTransporte) => {
    history.push(`/admin/AsignarBus/AsignarBusGestionar/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}/actividad/${idAsignacion}/transporte/${idTransporte}`);
  };

  const handleEliminar = async (idTransporte) => {
    const confirmar = window.confirm("¿Está seguro que desea eliminar esta asignación de transporte?");
    if (confirmar) {
      try {
        const response = await api.delete(`asignacionestransporteextra/${idTransporte}`);
        if (response.status === 200) {
          alert("Asignación de transporte eliminada correctamente.");
          setBuses((prevBuses) => prevBuses.filter((bus) => bus.id_asignacion_transporte !== idTransporte));
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error al eliminar la asignación de transporte:", error);
        alert("Ocurrió un error al intentar eliminar la asignación de transporte.");
      }
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                Listado de Buses Asignados
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
                Nuevo Transporte
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto mt-4">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Nombre Piloto
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Licencia
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Teléfono Piloto
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Matrícula
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Capacidad
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Marca
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Nombre Completo (Maestro)
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Teléfono (Maestro)
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus.id_asignacion_transporte}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {bus.nombre_piloto}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {bus.licencia}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {bus.telefono_piloto}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {bus.matricula}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {bus.capacidad}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {bus.marca}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {bus.nombre_completo}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {bus.telefono}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-lightBlue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEditar(bus.id_asignacion_transporte)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleEliminar(bus.id_asignacion_transporte)}
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
