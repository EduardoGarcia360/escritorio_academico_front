import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { api } from "services/api";

export default function AsignarActividadGestionar() {
  const { idCiclo, idJornadaCiclo, idGrado } = useParams();
  const history = useHistory();

  const [actividades, setActividades] = useState([]);
  const [selectedActividad, setSelectedActividad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');

  useEffect(() => {
    if (!idCiclo || !idJornadaCiclo || !idGrado) {
      alert('Parámetros incompletos');
      history.push('/admin/CicloEscolar/CicloEscolarPrincipal');
      return;
    }

    const fetchActividades = async () => {
      try {
        const response = await api.post('execute-procedure', {
          procedureName: 'listadoActividadPendienteAsignar',
          params: ["id_colegio", "id_grado"],
          objParams: { id_grado: idGrado },
        });
        setActividades(response.data.results || []);
      } catch (error) {
        console.error('Error al cargar las actividades:', error);
        alert('Ocurrió un error al cargar las actividades');
      }
    };

    fetchActividades();
  }, [idCiclo, idJornadaCiclo, idGrado, history]);

  const handleActividadChange = (e) => {
    console.log('actividades', actividades, e.target.value)
    const selected = actividades.find(act => act.id_gasto === Number(e.target.value));
    console.log('selected', selected)
    setSelectedActividad(e.target.value);
    setMonto(selected ? selected.monto : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedActividad || !descripcion) {
      alert('Debe seleccionar una actividad y proporcionar una descripción');
      return;
    }

    const payload = {
      id_gasto: selectedActividad,
      id_grado: idGrado,
      monto,
      descripcion,
      fecha_asignacion: new Date().toISOString().split('T')[0],
    };

    try {
      const response = await api.post('asignacionesgastoextra/', payload);
      if (response.status === 200) {
        alert('Actividad asignada exitosamente');
        history.push(`/admin/AsignarActividad/AsignarActividadPrincipal/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}`);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error al asignar la actividad:', error);
      alert('Ocurrió un error al asignar la actividad');
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <h1 className="text-2xl font-bold mb-4">Asignar Actividad a Grado</h1>
        <form id="asignar-actividad" onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="actividad" className="block text-sm font-medium text-gray-700">
              Seleccione una Actividad
            </label>
            <select
              id="actividad"
              name="actividad"
              value={selectedActividad}
              onChange={handleActividadChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="">Seleccione</option>
              {actividades.map((actividad) => (
                <option key={actividad.id_gasto} value={actividad.id_gasto}>
                  {actividad.desc_actividad}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="monto" className="block text-sm font-medium text-gray-700">
              Monto
            </label>
            <input
              type="text"
              id="monto"
              name="monto"
              value={monto}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              readOnly
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
              onClick={() => history.push(`/admin/AsignarActividad/AsignarActividadPrincipal/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}`)}
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
