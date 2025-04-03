import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function GastoExtraGestionar() {
  const { id } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({
    nombre_gasto: '',
    monto: '',
    fecha_gasto: '',
    descripcion: '',
    es_actividad_bus: false,
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await api.get(`gastosextraordinarios/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error al cargar los datos:', error);
          alert('Ocurrió un error al cargar los datos');
        }
      };
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre_gasto || !formData.monto || !formData.fecha_gasto) {
      alert('Los campos marcados con (*) son obligatorios');
      return;
    }

    try {
      if (id) {
        const response = await api.put(`gastosextraordinarios/${id}`, formData);
        console.log('actualizar', response)
        if (response.status === 200) {
          alert('Registro actualizado exitosamente');
          history.push('/admin/GastoExtra/GastoExtraPrincipal');
        } else {
          alert(response.data.message)
        }
      } else {
        const response = await api.post('gastosextraordinarios/', formData);
        console.log('nuevo', response)
        if (response.status === 200) {
          alert('Registro creado exitosamente');
          history.push('/admin/GastoExtra/GastoExtraPrincipal');
        } else {
          alert(response.data.message)
        }
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Ocurrió un error al guardar los datos');
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <h1 className="text-2xl font-bold mb-4">
          {id ? 'Editar Gasto Extraordinario' : 'Registrar Nuevo Gasto Extraordinario'}
        </h1>
        <form id="gasto-extra" onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="nombre_gasto" className="block text-sm font-medium text-gray-700">
              Nombre del Gasto <span className="text-red-500">(*)</span>
            </label>
            <input
              type="text"
              id="nombre_gasto"
              name="nombre_gasto"
              value={formData.nombre_gasto}
              onChange={handleChange}
              maxLength="100"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="monto" className="block text-sm font-medium text-gray-700">
              Monto <span className="text-red-500">(*)</span>
            </label>
            <input
              type="number"
              step="0.01"
              id="monto"
              name="monto"
              value={formData.monto}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fecha_gasto" className="block text-sm font-medium text-gray-700">
              Fecha del Gasto <span className="text-red-500">(*)</span>
            </label>
            <input
              type="date"
              id="fecha_gasto"
              name="fecha_gasto"
              value={formData.fecha_gasto}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              maxLength="255"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="es_actividad_bus" className="block text-sm font-medium text-gray-700">
              ¿Requiere Bus?
            </label>
            <input
              type="checkbox"
              id="es_actividad_bus"
              name="es_actividad_bus"
              checked={formData.es_actividad_bus}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-lightBlue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-lightBlue-600"
            >
              {id ? 'Actualizar' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={() => history.push('/admin/GastoExtra/GastoExtraPrincipal')}
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
