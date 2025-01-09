import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "services/api";

export default function PersonalDocentePrincipal() {
  const [docentes, setDocentes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const response = await api.get("personaldocente");
        setDocentes(response.data);
      } catch (error) {
        console.error("Error al obtener el personal docente:", error);
        alert("No se pudieron cargar los registros del personal docente.");
      }
    };

    fetchDocentes();
  }, []);

  const handleNuevo = () => {
    history.push("/admin/PersonalDocente/PersonalDocenteGestionar");
  };

  const handleEditar = (docenteId) => {
    history.push(`/admin/PersonalDocente/PersonalDocenteGestionar/${docenteId}`);
  };

  const handleEliminar = async (docenteId) => {
    const confirmar = window.confirm("¿Está seguro que desea eliminar este registro?");
    if (confirmar) {
      try {
        const response = await api.delete(`personaldocente/${docenteId}`);
        if (response.status === 200) {
          alert("Docente eliminado correctamente.");
          setDocentes((prevDocentes) => prevDocentes.filter((docente) => docente.id_docente !== docenteId));
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error al eliminar el docente:", error);
        alert("Ocurrió un error al intentar eliminar el docente.");
      }
    }
  };

  const renderEstado = (estado) => {
    let colorClass = "";
    let descripcion = "";
    switch (estado) {
      case "A":
        colorClass = "text-emerald-500";
        descripcion = "Activo";
        break;
      case "L":
        colorClass = "text-orange-500";
        descripcion = "Licencia";
        break;
      case "R":
        colorClass = "text-red-500";
        descripcion = "Retirado";
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
                Listado de Personal Docente
              </h3>
            </div>
            <div className="w-full flex justify-end px-2 mt-4">
              <button
                className="bg-emerald-500 text-white px-4 py-2 rounded flex items-center ml-2"
                onClick={handleNuevo}
              >
                Nuevo Docente
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto mt-4">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Código Empleado
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Nombre Completo
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Identificación
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Teléfono
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Correo Electrónico
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Estado Empleo
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {docentes.map((docente) => (
                <tr key={docente.id_docente}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {docente.codigo_empleado}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {docente.nombre_completo}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {docente.identificacion}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {docente.telefono}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {docente.correo_electronico}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {renderEstado(docente.estado_empleo)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-lightBlue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEditar(docente.id_docente)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleEliminar(docente.id_docente)}
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
