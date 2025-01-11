import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function CuotaEstudiantePrincipal() {
  const [cuotas, setCuotas] = useState([]);
  const { idCiclo, idJornadaCiclo, idGrado, idEstudiante } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!idCiclo || !idJornadaCiclo || !idGrado || !idEstudiante) {
      alert("Información incompleta para acceder a esta pantalla");
      history.push("/admin/CicloEscolar/CicloEscolarPrincipal");
      return;
    }

    const fetchCuotas = async () => {
      try {
        const response = await api.get(`cuotasestudiante/${idEstudiante}`);
        setCuotas(response.data);
      } catch (error) {
        console.error("Error al obtener las cuotas del estudiante:", error);
        alert("No se pudieron cargar las cuotas del estudiante.");
        history.push("/admin/CicloEscolar/CicloEscolarPrincipal");
      }
    };

    fetchCuotas();
  }, [idCiclo, idJornadaCiclo, idGrado, idEstudiante, history]);

  const handleRegresar = () => {
    history.push(`/admin/AsignarEstudiante/AsignarEstudiantePrincipal/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}`);
  };

  const handleGestionar = (idCuota) => {
    history.push(`/admin/CuotaEstudiante/CuotaEstudianteGestionar/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}/estudiante/${idEstudiante}/cuota/${idCuota}`);
  };

  const adjustDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString();
  };

  const renderEstado = (estado) => {
    let colorClass = "";
    let descripcion = "";
    switch (estado) {
      case "P":
        colorClass = "text-red-500";
        descripcion = "Pendiente";
        break;
      case "R":
        colorClass = "text-orange-500";
        descripcion = "Parcial";
        break;
      case "G":
        colorClass = "text-emerald-500";
        descripcion = "Pagada";
        break;
      default:
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
                Listado de Cuotas del Estudiante
              </h3>
            </div>
            <div className="w-full flex justify-end px-2 mt-4">
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
                  Periodo
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Monto
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Estado
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Fecha Vencimiento
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
              {cuotas.map((cuota) => (
                <tr key={cuota.id_cuota_estudiante}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {cuota.periodo}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {cuota.monto}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {renderEstado(cuota.estado)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {adjustDate(cuota.fecha_vencimiento)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {adjustDate(cuota.createdAt)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-lightBlue-500 text-white px-3 py-1 rounded"
                      onClick={() => handleGestionar(cuota.id_cuota_estudiante)}
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
