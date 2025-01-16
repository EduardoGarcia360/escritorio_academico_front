import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { api } from "services/api";

export default function AsignarBusGestionar() {
  const { idCiclo, idJornadaCiclo, idGrado, idAsignacion, idTransporte } = useParams();
  const history = useHistory();

  const [buses, setBuses] = useState([]);
  const [maestros, setMaestros] = useState([]);
  const [formData, setFormData] = useState({
    id_asignacion: idAsignacion,
    id_bus: '',
    id_docente: '',
    nombre_piloto: '',
    licencia: '',
    telefono_piloto: '',
    observaciones: '',
  });

  useEffect(() => {
    if (!idCiclo || !idJornadaCiclo || !idGrado || !idAsignacion) {
      alert('Parámetros incompletos');
      history.push('/admin/CicloEscolar/CicloEscolarPrincipal');
      return;
    }

    const fetchMaestros = async () => {
      try {
        const response = await api.post('execute-procedure', {
          procedureName: 'listadoMaestrosPorGrado',
          params: ["id_colegio", "id_grado"],
          objParams: { id_grado: idGrado },
        });
        setMaestros(response.data.results || []);
      } catch (error) {
        console.error('Error al cargar los maestros:', error);
        alert('Ocurrió un error al cargar los maestros');
      }
    };

    const fetchBuses = async () => {
      try {
        const response = await api.get('buses/');
        setBuses(response.data || []);
      } catch (error) {
        console.error('Error al cargar los buses:', error);
        alert('Ocurrió un error al cargar los buses');
      }
    };

    const fetchTransporte = async () => {
      if (idTransporte) {
        try {
          const response = await api.get(`asignacionestransporteextra/${idTransporte}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error al cargar los datos del transporte:', error);
          alert('Ocurrió un error al cargar los datos del transporte');
        }
      }
    };

    fetchMaestros();
    fetchBuses();
    fetchTransporte();
  }, [idCiclo, idJornadaCiclo, idGrado, idAsignacion, idTransporte, history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id_bus || !formData.id_docente || !formData.nombre_piloto || !formData.licencia) {
      alert('Todos los campos marcados con (*) son obligatorios');
      return;
    }

    try {
      if (idTransporte) {
        await api.put(`asignacionestransporteextra/${idTransporte}`, formData);
        alert('Registro actualizado exitosamente');
      } else {
        await api.post('asignacionestransporteextra/', formData);
        alert('Registro creado exitosamente');
      }
      history.push(`/admin/AsignarBus/AsignarBusPrincipal/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}/actividad/${idAsignacion}/transporte/`);
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Ocurrió un error al guardar los datos');
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <h1 className="text-2xl font-bold mb-4">
          {idTransporte ? 'Editar Asignación de Transporte' : 'Nueva Asignación de Transporte'}
        </h1>
        <form id="asignar-bus" onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="id_bus" className="block text-sm font-medium text-gray-700">
              Seleccione un Bus <span className="text-red-500">(*)</span>
            </label>
            <select
              id="id_bus"
              name="id_bus"
              value={formData.id_bus}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="">Seleccione</option>
              {buses.map((bus) => (
                <option key={bus.id_bus} value={bus.id_bus}>
                  {`${bus.matricula} (${bus.capacidad}, ${bus.marca})`}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="id_docente" className="block text-sm font-medium text-gray-700">
              Seleccione un Maestro <span className="text-red-500">(*)</span>
            </label>
            <select
              id="id_docente"
              name="id_docente"
              value={formData.id_docente}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="">Seleccione</option>
              {maestros.map((maestro) => (
                <option key={maestro.id_docente} value={maestro.id_docente}>
                  {`${maestro.nombre_completo} (${maestro.codigo_empleado})`}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="nombre_piloto" className="block text-sm font-medium text-gray-700">
              Nombre del Piloto <span className="text-red-500">(*)</span>
            </label>
            <input
              type="text"
              id="nombre_piloto"
              name="nombre_piloto"
              value={formData.nombre_piloto}
              onChange={handleChange}
              maxLength="100"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="licencia" className="block text-sm font-medium text-gray-700">
              Licencia <span className="text-red-500">(*)</span>
            </label>
            <input
              type="text"
              id="licencia"
              name="licencia"
              value={formData.licencia}
              onChange={handleChange}
              maxLength="50"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="telefono_piloto" className="block text-sm font-medium text-gray-700">
              Teléfono del Piloto
            </label>
            <input
              type="text"
              id="telefono_piloto"
              name="telefono_piloto"
              value={formData.telefono_piloto}
              onChange={handleChange}
              maxLength="20"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700">
              Observaciones
            </label>
            <textarea
              id="observaciones"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-lightBlue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-lightBlue-600"
            >
              {idTransporte ? 'Actualizar' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={() => history.push(`/admin/AsignarBus/AsignarBusPrincipal/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}/actividad/${idAsignacion}/transporte/`)}
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
