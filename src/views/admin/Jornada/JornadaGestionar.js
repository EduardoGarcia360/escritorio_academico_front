import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function JornadaGestionar() {
  const { id, idJornada } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({
    nombre: '',
    horario_inicio: '',
    horario_fin: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateTimes = () => {
    const { horario_inicio, horario_fin } = formData;
    if (horario_inicio && horario_fin) {
      const today = new Date().toISOString().split('T')[0];
      const startTime = new Date(`${today}T${horario_inicio}`);
      const endTime = new Date(`${today}T${horario_fin}`);

      if (startTime >= endTime) {
        alert('El horario de inicio debe ser anterior al horario final.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateTimes()) {
      return;
    }

    try {
      const payload = { ...formData, id_nivel: id };

      if (idJornada) {
        const response = await api.put(`jornadas/${idJornada}`, payload);
        console.log('actualizar', response)
        if (response.status === 200) {
          alert('Registro actualizado exitosamente');
          history.push(`/admin/Jornada/JornadaPrincipal/${id}`);
        } else {
          alert(response.data.message)
        }
      } else {
        const response = await api.post('jornadas/', payload);
        console.log('nuevo', response)
        if (response.status === 200) {
          alert('Registro creado exitosamente');
          history.push(`/admin/Jornada/JornadaPrincipal/${id}`);
        } else {
          alert(response.data.message)
        }
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Ocurrió un error al guardar los datos');
    }
  };

  useEffect(() => {
    if (idJornada) {
      const fetchData = async () => {
        try {
          const response = await api.get(`jornadas/${idJornada}`);
          console.log('jornada', response)
          setFormData(response.data);
        } catch (error) {
          console.error('Error al cargar los datos:', error);
          alert('Ocurrió un error al cargar los datos');
        }
      };
      fetchData();
    }
  }, [idJornada]);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <h1 className="text-2xl font-bold mb-4">
          {idJornada ? 'Editar Jornada' : 'Registrar Nueva Jornada'}
        </h1>
        <form id="jornada" onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre <span className="text-red-500">(*)</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              maxLength="50"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="horario_inicio" className="block text-sm font-medium text-gray-700">
              Horario de Inicio <span className="text-red-500">(*)</span>
            </label>
            <input
              type="time"
              id="horario_inicio"
              name="horario_inicio"
              value={formData.horario_inicio}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="horario_fin" className="block text-sm font-medium text-gray-700">
              Horario de Fin <span className="text-red-500">(*)</span>
            </label>
            <input
              type="time"
              id="horario_fin"
              name="horario_fin"
              value={formData.horario_fin}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-lightBlue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-lightBlue-600"
            >
              {idJornada ? 'Actualizar' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={() => history.push(`/admin/Jornada/JornadaPrincipal/${id}`)}
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
