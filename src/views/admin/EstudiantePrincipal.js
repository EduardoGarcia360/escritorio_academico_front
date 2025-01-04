import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "services/api";

export default function EstudiantePrincipal() {
  const [hasMounted, setHasMounted] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [jornadas, setJornadas] = useState([]);
  const [grados, setGrados] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [idNivel, setIdNivel] = useState("");
  const [idJornada, setIdJornada] = useState("");
  const [idGrado, setIdGrado] = useState("");
  const [seccion, setSeccion] = useState("");
  const history = useHistory();

  const getCatalogos = async () => {
    try {
      const nivelResponse = await api.get("niveleducacion");
      const seccionResponse = await api.get("secciones");

      setNiveles(nivelResponse.data);
      setSecciones(seccionResponse.data);
    } catch (error) {
      console.error("Error al obtener los catálogos:", error);
    }
  };

  const getJornadas = async (nivelId) => {
    try {
      const jornadaResponse = await api.get(`jornadas/niveleducacion/${nivelId}`);
      setJornadas(jornadaResponse.data);
    } catch (error) {
      console.error("Error al obtener jornadas:", error);
    }
  };

  const getGrados = async (jornadaId) => {
    try {
      const gradoResponse = await api.get(`grados/jornada/${jornadaId}`);
      setGrados(gradoResponse.data);
    } catch (error) {
      console.error("Error al obtener grados:", error);
    }
  };

  const getDatos = async () => {
    try {
      const params = {
        procedureName: "listarestudiantes",
        params: ["id_colegio", "id_jornada", "id_grado", "seccion"],
        objParams: {
          id_jornada: idJornada,
          id_grado: idGrado,
          seccion: seccion,
        },
      };
      const response = await api.post("execute-procedure", params);
      console.log("ESTUDIANTES", response);
      setRegistros(response.data.results);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  };

  useEffect(() => {
    if (hasMounted) {
      getCatalogos(); // Llama al método para obtener los catálogos iniciales
    }
  }, [hasMounted]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleNivelChange = (e) => {
    const nivelId = e.target.value;
    setIdNivel(nivelId);
    setJornadas([]);
    setGrados([]);
    setIdJornada("");
    setIdGrado("");
    if (nivelId) {
      getJornadas(nivelId);
    }
  };

  const handleJornadaChange = (e) => {
    const jornadaId = e.target.value;
    setIdJornada(jornadaId);
    setGrados([]);
    setIdGrado("");
    if (jornadaId) {
      getGrados(jornadaId);
    }
  };

  const irAEditar = (id) => {
    history.push(`/admin/Estudiante/EstudianteGestionar/${id}`);
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
          </div>
          {/* Filtros */}
          <div className="flex flex-wrap items-center mt-4">
            <div className="w-1/4 px-2">
              <label className="block text-sm font-medium text-gray-700">
                Nivel de Educación
              </label>
              <select
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={idNivel}
                onChange={handleNivelChange}
              >
                <option value="">Seleccione un nivel</option>
                {niveles.map((nivel) => (
                  <option key={nivel.id_nivel} value={nivel.id_nivel}>
                    {nivel.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/4 px-2">
              <label className="block text-sm font-medium text-gray-700">
                Jornada
              </label>
              <select
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={idJornada}
                onChange={handleJornadaChange}
              >
                <option value="">Seleccione una jornada</option>
                {jornadas.map((jornada) => (
                  <option key={jornada.id_jornada} value={jornada.id_jornada}>
                    {jornada.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/4 px-2">
              <label className="block text-sm font-medium text-gray-700">
                Grado
              </label>
              <select
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={idGrado}
                onChange={(e) => setIdGrado(e.target.value)}
              >
                <option value="">Seleccione un grado</option>
                {grados.map((grado) => (
                  <option key={grado.id_grado} value={grado.id_grado}>
                    {grado.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/4 px-2">
              <label className="block text-sm font-medium text-gray-700">
                Sección
              </label>
              <select
                className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={seccion}
                onChange={(e) => setSeccion(e.target.value)}
              >
                <option value="">Seleccione una sección</option>
                {secciones.map((sec) => (
                  <option key={sec.nombre} value={sec.nombre}>
                    {sec.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex justify-end px-2 mt-4">
              <button
                className="bg-lightBlue-500 text-white px-4 py-2 rounded flex items-center"
                onClick={getDatos}
              >
                <i className="fas fa-search mr-2"></i> Buscar
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
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {registros.map((estudiante) => (
                <tr key={estudiante.id_estudiante}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <img
                      src={estudiante.fotografia || "https://via.placeholder.com/50"}
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
                    {estudiante.estado_matricula}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-lightBlue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => irAEditar(estudiante.id_estudiante)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        console.log(`Eliminar ${estudiante.id_estudiante}`)
                      }
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
