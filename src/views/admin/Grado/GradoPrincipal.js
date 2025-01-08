import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function GradoPrincipal() {
  const [grados, setGrados] = useState([]);
  const { idCiclo, idJornadaCiclo } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!idCiclo || !idJornadaCiclo) {
      alert("Información de Ciclo Escolar o Jornada no encontrada");
      history.push("/admin/CicloEscolar/CicloEscolarPrincipal");
      return;
    }

    const fetchGrados = async () => {
      try {
        const response = await api.get(`grados/jornadaciclo/${idJornadaCiclo}`);
        setGrados(response.data);
      } catch (error) {
        console.error("Error al obtener los grados:", error);
        alert("No se pudieron cargar los grados.");
        history.push("/admin/CicloEscolar/CicloEscolarPrincipal");
      }
    };

    fetchGrados();
  }, [idCiclo, idJornadaCiclo, history]);

  const handleNuevo = () => {
    history.push(`/admin/Grado/GradoGestionar/${idCiclo}/jornada/${idJornadaCiclo}/grado/`);
  };

  const handleEditar = (gradoId) => {
    history.push(`/admin/Grado/GradoGestionar/${idCiclo}/jornada/${idJornadaCiclo}/grado/${gradoId}`);
  };

  const handleEliminar = async (gradoId) => {
    const confirmar = window.confirm("¿Está seguro que desea eliminar este grado?");
    if (confirmar) {
      try {
        const response = await api.delete(`grados/${gradoId}`);
        if (response.status === 200) {
            alert("Grado eliminado correctamente.");
            setGrados((prevGrados) => prevGrados.filter((grado) => grado.id_grado !== gradoId));
        } else {
            alert(response.data.message)
        }
      } catch (error) {
        console.error("Error al eliminar el grado:", error);
        alert("Ocurrió un error al intentar eliminar el grado.");
      }
    }
  };

  const handleRegresar = () => {
    history.push(`/admin/CicloEscolarJornada/CicloEscolarJornadaPrincipal/${idCiclo}`);
  };

  const handleVerEstudiantes = (id_grado) => {
    history.push(`/admin/AsignarEstudiante/AsignarEstudiantePrincipal/${idCiclo}/jornada/${idJornadaCiclo}/grado/${id_grado}`)
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                Listado de Grados
              </h3>
            </div>
            <div className="w-full flex justify-end px-2 mt-4">
              <button
                className="bg-emerald-500 text-white px-4 py-2 rounded flex items-center ml-2"
                onClick={handleNuevo}
              >
                Nuevo Grado
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
                  Sección
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Descripción
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Estudiantes
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {grados.map((grado) => (
                <tr key={grado.id_grado}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {grado.nombre}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {grado.seccion}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {grado.descripcion}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-lightBlue-500 text-white px-3 py-1 rounded-full flex items-center"
                      onClick={() => handleVerEstudiantes(grado.id_grado)}
                    >
                      <i className="fas fa-star mr-2"></i>
                      {grado.cantidad_estudiantes}
                    </button>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-lightBlue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEditar(grado.id_grado)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleEliminar(grado.id_grado)}
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
