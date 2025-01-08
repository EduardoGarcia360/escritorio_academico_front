import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function CicloJornadaGestionar() {
  const { id } = useParams();
  const history = useHistory();

  const [jornadas, setJornadas] = useState([]);
  const [selectedJornada, setSelectedJornada] = useState('');

  useEffect(() => {
    if (!id) {
      alert('Ciclo escolar no encontrado');
      history.push('/admin/CicloEscolar/CicloEscolarPrincipal');
      return;
    }

    const fetchJornadas = async () => {
      try {
        const response = await api.post('execute-procedure', {
          procedureName: 'listadoJornadaColegio',
          params: ["id_colegio", "id_ciclo"],
          objParams: { id_ciclo: id },
        });
        console.log('response', response)
        setJornadas(response.data.results || []);
      } catch (error) {
        console.error('Error al cargar las jornadas:', error);
        alert('Ocurrió un error al cargar las jornadas');
      }
    };

    fetchJornadas();
  }, [id, history]);

  const handleChange = (e) => {
    setSelectedJornada(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedJornada) {
      alert('Debe seleccionar una jornada');
      return;
    }

    try {
      await api.post('jornadacicloescolar/', {
        id_jornada: selectedJornada,
        id_ciclo: id,
      });
      alert('Jornada asociada exitosamente');
      history.push(`/admin/CicloEscolarJornada/CicloEscolarJornadaPrincipal/${id}`);
    } catch (error) {
      console.error('Error al guardar la asociación:', error);
      alert('Ocurrió un error al guardar la asociación');
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <h1 className="text-2xl font-bold mb-4">Asociar Jornada a Ciclo Escolar</h1>
        <form id="ciclo-jornada" onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="jornada" className="block text-sm font-medium text-gray-700">
              Seleccione una Jornada
            </label>
            <select
              id="jornada"
              name="jornada"
              value={selectedJornada}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="">Seleccione</option>
              {jornadas.map((jornada) => (
                <option key={jornada.id_jornada} value={jornada.id_jornada}>
                  {jornada.desc_jornada}
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
              onClick={() => history.push(`/admin/CicloEscolarJornada/CicloEscolarJornadaPrincipal/${id}`)}
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
