import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function AsignarEstudianteGestionar() {
  const { idCiclo, idJornadaCiclo, idGrado } = useParams();
  const history = useHistory();

  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedEstudiante, setSelectedEstudiante] = useState('');

  useEffect(() => {
    if (!idGrado) {
      alert('Grado no encontrado');
      history.push(`/admin/CicloEscolar/CicloEscolarPrincipal`);
      return;
    }

    const fetchEstudiantes = async () => {
      try {
        const response = await api.post('execute-procedure', {
          procedureName: 'listadoEstudiantesPendienteAsignar',
          params: ["id_colegio"],
          objParams: {},
        });
        setEstudiantes(response.data.results || []);
      } catch (error) {
        console.error('Error al cargar los estudiantes:', error);
        alert('Ocurrió un error al cargar los estudiantes');
      }
    };

    fetchEstudiantes();
  }, [idGrado, history]);

  const handleChange = (e) => {
    setSelectedEstudiante(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEstudiante) {
      alert('Debe seleccionar un estudiante');
      return;
    }

    const payload = {
      id_estudiante: selectedEstudiante,
      id_grado: idGrado,
      fecha_inscripcion: new Date().toISOString().split('T')[0],
    };

    try {
      await api.post('asignacionesestudiantegrado/', payload);
      alert('Estudiante asignado exitosamente');
      history.push(`/admin/AsignarEstudiante/AsignarEstudiantePrincipal/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}`);
    } catch (error) {
      console.error('Error al asignar el estudiante:', error);
      alert('Ocurrió un error al asignar el estudiante');
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <h1 className="text-2xl font-bold mb-4">Asignar Estudiante a Grado</h1>
        <form id="asignar-estudiante" onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="estudiante" className="block text-sm font-medium text-gray-700">
              Seleccione un Estudiante
            </label>
            <select
              id="estudiante"
              name="estudiante"
              value={selectedEstudiante}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="">Seleccione</option>
              {estudiantes.map((estudiante) => (
                <option key={estudiante.id_estudiante} value={estudiante.id_estudiante}>
                  {estudiante.desc_estudiante}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-lightBlue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-lightBlue-600"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => history.push(`/admin/AsignarEstudiante/AsignarEstudiantePrincipal/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}`)}
              className="bg-red-700 text-white font-medium py-2 px-4 rounded-md hover:bg-red-800"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
