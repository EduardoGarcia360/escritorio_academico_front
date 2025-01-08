import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function AsignarEstudiantePrincipal() {
  const [estudiantes, setEstudiantes] = useState([]);
  const { idCiclo, idJornadaCiclo, idGrado } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!idCiclo || !idJornadaCiclo || !idGrado) {
      alert("Información incompleta para acceder a esta pantalla");
      history.push("/admin/CicloEscolar/CicloEscolarPrincipal");
      return;
    }

    const fetchEstudiantes = async () => {
      try {
        const params = {
          procedureName: "listadoEstudiantesPorGrado",
          params: ["id_grado", "id_colegio"],
          objParams: { id_grado: idGrado },
        };
        const response = await api.post("execute-procedure", params);
        setEstudiantes(response.data.results);
      } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
        alert("No se pudieron cargar los estudiantes.");
        history.push("/admin/CicloEscolar/CicloEscolarPrincipal");
      }
    };

    fetchEstudiantes();
  }, [idCiclo, idJornadaCiclo, idGrado, history]);

  const handleRegresar = () => {
    history.push(`/admin/Grado/GradoPrincipal/${idCiclo}/jornada/${idJornadaCiclo}`);
  };

  const handleEliminar = async (asignacionId) => {
    const confirmar = window.confirm("¿Está seguro que desea eliminar esta asignación?");
    if (confirmar) {
      try {
        const response = await api.delete(`asignacionesestudiantegrado/${asignacionId}`);
        if (response.status === 200) {
            alert("Asignación eliminada correctamente.");
            setEstudiantes((prevEstudiantes) => prevEstudiantes.filter((estudiante) => estudiante.id_asignacion !== asignacionId));
        } else {
            alert(response.data.message)
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

  const renderEstado = (estado) => {
    let colorClass = "";
    let descripcion = "";
    switch (estado) {
      case "A":
        colorClass = "text-emerald-500";
        descripcion = "Activo";
        break;
      case "R":
        colorClass = "text-red-500";
        descripcion = "Retirado";
        break;
      case "G":
        colorClass = "text-orange-500";
        descripcion = "Graduado";
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

  const handleNuevo = () => {
    history.push(`/admin/AsignarEstudiante/AsignarEstudianteGestionar/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}`);
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                Listado de Estudiantes Asignados
              </h3>
            </div>
            <div className="w-full flex justify-end px-2 mt-4">
            <button
                className="bg-emerald-500 text-white px-4 py-2 rounded flex items-center ml-2"
                onClick={handleNuevo}
              >
                Nueva Asignación
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
                  Fotografía
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Nombre Completo
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Fecha Nacimiento
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Identificación
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Fecha Inscripción
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Estado Matrícula
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((estudiante) => (
                <tr key={estudiante.id_asignacion}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <img
                      src={estudiante.fotografia}
                      alt="Fotografía"
                      className="h-12 w-12 bg-white rounded-full border"
                    />
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {estudiante.nombre_completo}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {adjustDate(estudiante.fecha_nacimiento)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {estudiante.identificacion}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {adjustDate(estudiante.fecha_inscripcion)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {renderEstado(estudiante.estado_matricula)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleEliminar(estudiante.id_asignacion)}
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
