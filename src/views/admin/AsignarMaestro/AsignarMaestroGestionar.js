import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function AsignarMaestroGestionar() {
  const { idCiclo, idJornadaCiclo, idGrado } = useParams();
  const history = useHistory();

  const [maestros, setMaestros] = useState([]);
  const [selectedMaestro, setSelectedMaestro] = useState('');
  const [rolDocente, setRolDocente] = useState('');

  useEffect(() => {
    if (!idCiclo || !idJornadaCiclo || !idGrado) {
      alert('Parámetros incompletos');
      history.push('/admin/CicloEscolar/CicloEscolarPrincipal');
      return;
    }

    const fetchMaestros = async () => {
      try {
        const response = await api.post('execute-procedure', {
          procedureName: 'listadoMaestrosPendienteAsignar',
          params: ["id_colegio", "id_grado"],
          objParams: { id_grado: idGrado },
        });
        setMaestros(response.data.results || []);
      } catch (error) {
        console.error('Error al cargar los maestros:', error);
        alert('Ocurrió un error al cargar los maestros');
      }
    };

    fetchMaestros();
  }, [idCiclo, idJornadaCiclo, idGrado, history]);

  const handleMaestroChange = (e) => {
    setSelectedMaestro(e.target.value);
  };

  const handleRolDocenteChange = (e) => {
    setRolDocente(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMaestro || !rolDocente) {
      alert('Debe seleccionar un maestro y asignar un rol docente');
      return;
    }

    const payload = {
      id_docente: selectedMaestro,
      id_grado: idGrado,
      fecha_asignacion: new Date().toISOString().split('T')[0],
      rol_docente: rolDocente,
    };

    try {
      await api.post('asignacionesdocentegrado/', payload);
      alert('Maestro asignado exitosamente');
      history.push(`/admin/AsignarMaestro/AsignarMaestroPrincipal/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}`);
    } catch (error) {
      console.error('Error al asignar el maestro:', error);
      alert('Ocurrió un error al asignar el maestro');
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <h1 className="text-2xl font-bold mb-4">Asignar Maestro a Grado</h1>
        <form id="asignar-maestro" onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="maestro" className="block text-sm font-medium text-gray-700">
              Seleccione un Maestro
            </label>
            <select
              id="maestro"
              name="maestro"
              value={selectedMaestro}
              onChange={handleMaestroChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="">Seleccione</option>
              {maestros.map((maestro) => (
                <option key={maestro.id_docente} value={maestro.id_docente}>
                  {maestro.desc_maestro}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="rol_docente" className="block text-sm font-medium text-gray-700">
              Rol Docente
            </label>
            <input
              type="text"
              id="rol_docente"
              name="rol_docente"
              value={rolDocente}
              onChange={handleRolDocenteChange}
              maxLength="50"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
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
              onClick={() => history.push(`/admin/AsignarMaestro/AsignarMaestroPrincipal/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}`)}
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
