import React, { useState, useEffect } from "react";
import { api } from "services/api";
import { useHistory } from "react-router-dom";

export default function RegistroHorarioBusPrincipal() {
  const [actividades, setActividades] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const params = {
          procedureName: "listarMisActividadesAsignadas",
          params: ["id_colegio", "id_docente"],
          objParams: { id_docente: 1 },
        };
        const response = await api.post("execute-procedure", params);
        setActividades(response.data.results);
      } catch (error) {
        console.error("Error al obtener las actividades asignadas:", error);
        alert("No se pudieron cargar las actividades asignadas.");
      }
    };

    fetchActividades();
  }, []);

  const handleGestionar = (actividad) => {
    // console.log("Gestionar actividad:", actividad);
    history.push(`/admin/RegistroHorarioBus/RegistroHorarioBusGestionar/${actividad.id_asignacion_transporte}`);
  };

  const renderTipoRegistro = (tipoRegistro, estado) => {
    // console.log("tipoRegistro", tipoRegistro, "estado", estado);
    let colorClass = "";
    let descripcion = "";
    if (tipoRegistro === null && estado === "A") {
      colorClass = "text-emerald-500";
      descripcion = "Activo";
    } else if (tipoRegistro === "L" && estado === "F") {
      colorClass = "text-lightBlue-500";
      descripcion = "Llegada (Finalizada)";
    } else {
      colorClass = "text-gray-500";
      descripcion = "Desconocido";
    }
    return (
      <span className="flex items-center">
        <i className={`fas fa-circle ${colorClass} mr-2`}></i>
        {descripcion}
      </span>
    );
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                Registro de Horario de Buses
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto mt-4">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Nombre Piloto
                </th>
                <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Licencia
                </th>
                <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Teléfono Piloto
                </th>
                <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Observaciones
                </th>
                <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Matrícula
                </th>
                <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Marca
                </th>
                <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Color
                </th>
                <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Tipo Registro
                </th>
                <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Hora Finalizado
                </th>
                <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {actividades.map((actividad) => (
                <tr key={actividad.id_asignacion_transporte}>
                  <td className="border-t-0 px-6 py-4 text-xs text-left">
                    {actividad.nombre_piloto}
                  </td>
                  <td className="border-t-0 px-6 py-4 text-xs text-left">
                    {actividad.licencia}
                  </td>
                  <td className="border-t-0 px-6 py-4 text-xs text-left">
                    {actividad.telefono_piloto}
                  </td>
                  <td className="border-t-0 px-6 py-4 text-xs text-left">
                    {actividad.observaciones}
                  </td>
                  <td className="border-t-0 px-6 py-4 text-xs text-left">
                    {actividad.matricula}
                  </td>
                  <td className="border-t-0 px-6 py-4 text-xs text-left">
                    {actividad.marca}
                  </td>
                  <td className="border-t-0 px-6 py-4 text-xs text-left">
                    {actividad.color}
                  </td>
                  <td className="border-t-0 px-6 py-4 text-xs text-left">
                    {renderTipoRegistro(actividad.tipo_registro, actividad.estado)}
                  </td>
                  <td className="border-t-0 px-6 py-4 text-xs text-left">
                    {actividad.hora_finalizado}
                  </td>
                  <td className="border-t-0 px-6 py-4 text-xs text-left">
                    <button
                      className="bg-orange-500 text-white px-3 py-1 rounded"
                      onClick={() => handleGestionar(actividad)}
                    >
                      Gestionar
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
