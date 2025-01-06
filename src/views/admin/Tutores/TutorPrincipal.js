import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function TutorPrincipal() {
  const [tutores, setTutores] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!id) {
      alert("Estudiante no encontrado");
      history.push("/admin/EstudiantePrincipal");
      return;
    }

    const fetchTutores = async () => {
      try {
        const response = await api.get(`tutores/estudiante/${id}`);
        console.log('response', response)
        setTutores(response.data);
      } catch (error) {
        console.error("Error al obtener tutores:", error);
        alert("No se pudieron cargar los tutores.");
        history.push("/admin/EstudiantePrincipal");
      }
    };

    fetchTutores();
  }, [id, history]);

  const handleRegresar = () => {
    history.push(`/admin/EstudiantePrincipal`);
  };

  const handleNuevoTutor = () => {
    console.log("nuevo tutor");
    history.push(`/admin/Tutores/TutorGestionar/${id}/tutor`);
  };

  const handleEditarTutor = (tutorId) => {
    console.log("editar tutor", tutorId);
    history.push(`/admin/Tutores/TutorGestionar/${id}/tutor/${tutorId}`);
  };

  const handleEliminarTutor = async (tutorId) => {
    const confirmar = window.confirm("¿Está seguro que desea eliminar este registro?");
    if (confirmar) {
      try {
        await api.delete(`tutores/${tutorId}`);
        alert("Tutor eliminado correctamente.");
        setTutores((prevTutores) => prevTutores.filter((tutor) => tutor.id_tutor !== tutorId));
      } catch (error) {
        console.error("Error al eliminar tutor:", error);
        alert("Ocurrió un error al intentar eliminar el tutor.");
      }
    }
  };

  const renderResponsable = (esResponsable) => {
    const colorClass = esResponsable ? "text-emerald-500" : "text-red-500";
    const descripcion = esResponsable ? "Sí" : "No";
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
                Listado de Tutores
              </h3>
            </div>
            <div className="w-full flex justify-end px-2 mt-4">
              <button
                className="bg-emerald-500 text-white px-4 py-2 rounded flex items-center ml-2"
                onClick={handleNuevoTutor}
              >
                Nuevo Tutor
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
                  Dirección
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Responsable Principal
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {tutores.map((tutor) => (
                <tr key={tutor.id_tutor}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {tutor.nombre_completo}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {tutor.identificacion}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {tutor.telefono}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {tutor.correo_electronico}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {tutor.direccion}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {renderResponsable(tutor.es_responsable_principal)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-lightBlue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEditarTutor(tutor.id_tutor)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleEliminarTutor(tutor.id_tutor)}
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
