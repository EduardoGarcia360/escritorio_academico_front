import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "services/api";

export default function EstudiantePrincipal() {
  const [hasMounted, setHasMounted] = useState(false);
  const [registros, setRegistros] = useState([]);
  const history = useHistory();

  const getDatos = async () => {
    try {
      const params = {
        procedureName: "listadoGeneralEstudiantes",
        params: ["id_colegio"],
        objParams: {},
      };
      const response = await api.post("execute-procedure", params);
      if (response.status === 200) {
        setRegistros(response.data.results);
      } else {
        setRegistros([]);
      }
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
      setRegistros([]);
    }
  };

  useEffect(() => {
    if (hasMounted) {
      getDatos(); // Carga inicial de datos
    }
  }, [hasMounted]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const irAEditar = (id) => {
    history.push(`/admin/Estudiante/EstudianteGestionar/${id}`);
  };

  const irATutores = (id) => {
    console.log("ruta aqui", id);
    history.push(`/admin/Tutores/TutorPrincipal/${id}`);
  };

  const eliminarEstudiante = async (id) => {
    const confirmar = window.confirm(
      "¿Está seguro que desea eliminar este registro?"
    );
    if (confirmar) {
      try {
        const objParam = { estado_matricula: "R" };
        const response = await api.put(`estudiantes/inactivar/${id}`, objParam);
        if (response.status === 200) {
          alert("Registro eliminado correctamente.");
          getDatos(); // Refrescar los datos después de eliminar
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        console.error("Error al eliminar estudiante:", error);
        alert("Ocurrió un error al intentar eliminar el registro.");
      }
    }
  };

  const renderEstadoMatricula = (estado) => {
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

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                Listado de Estudiantes
              </h3>
            </div>
            <div className="w-full flex justify-end px-2 mt-4">
              <button
                className="bg-emerald-500 text-white px-4 py-2 rounded flex items-center ml-2"
                onClick={() =>
                  history.push("/admin/Estudiante/EstudianteGestionar")
                }
              >
                Nuevo
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
                  Identificación
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Código Estudiante
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Estado Matrícula
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Jornada Inicio
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Jornada Fin
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Grado
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Sección
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Tutores
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {registros.map((estudiante) => (
                <tr key={estudiante.id_estudiante}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <img
                      src={
                        estudiante.fotografia ||
                        "https://via.placeholder.com/50"
                      }
                      alt="Fotografía"
                      className="h-12 w-12 rounded-full border"
                    />
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {estudiante.nombre_completo}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {estudiante.identificacion}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {estudiante.codigo_estudiante}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {renderEstadoMatricula(estudiante.estado_matricula)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {estudiante.jornada_inicio}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {estudiante.jornada_fin}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {estudiante.grado}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {estudiante.seccion}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="flex items-center bg-lightBlue-500 text-white px-3 py-1 rounded-full"
                      onClick={() => irATutores(estudiante.id_estudiante)}
                    >
                      <i className="fas fa-user mr-2"></i>
                      {estudiante.cantidad_tutores}
                    </button>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {estudiante.estado_matricula === "A" && (
                      <button
                        className="bg-lightBlue-500 text-white px-3 py-1 rounded mr-2"
                        onClick={() => irAEditar(estudiante.id_estudiante)}
                      >
                        Editar
                      </button>
                    )}
                    {estudiante.estado_matricula === "A" && (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() =>
                          eliminarEstudiante(estudiante.id_estudiante)
                        }
                      >
                        Eliminar
                      </button>
                    )}
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
