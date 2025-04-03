import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function BusGestionar() {
  const { id } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({
    matricula: '',
    capacidad: '',
    marca: '',
    modelo: '',
    anio: '',
    color: '',
    numero_seguro: '',
    fecha_proximo_mantenimiento: '',
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await api.get(`buses/${id}`);
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.matricula || !formData.capacidad || !formData.marca || !formData.modelo) {
      alert('Los campos marcados con (*) son obligatorios');
      return;
    }

    try {
      if (id) {
        const response = await api.put(`buses/${id}`, formData);
        console.log('actualizar', response)
        if (response.status === 200) {
          alert('Registro actualizado exitosamente');
          history.push('/admin/Bus/BusPrincipal');
        } else {
          alert(response.data.message)
        }
      } else {
        const response = await api.post('buses/', formData);
        console.log('nuevo', response)
        if (response.status === 200) {
          alert('Registro creado exitosamente');
          history.push('/admin/Bus/BusPrincipal');
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
          {id ? 'Editar Bus' : 'Registrar Nuevo Bus'}
        </h1>
        <form id="bus" onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">
              Matrícula <span className="text-red-500">(*)</span>
            </label>
            <input
              type="text"
              id="matricula"
              name="matricula"
              value={formData.matricula}
              onChange={handleChange}
              maxLength="50"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="capacidad" className="block text-sm font-medium text-gray-700">
              Capacidad <span className="text-red-500">(*)</span>
            </label>
            <input
              type="number"
              id="capacidad"
              name="capacidad"
              value={formData.capacidad}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="marca" className="block text-sm font-medium text-gray-700">
              Marca <span className="text-red-500">(*)</span>
            </label>
            <input
              type="text"
              id="marca"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              maxLength="50"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="modelo" className="block text-sm font-medium text-gray-700">
              Modelo <span className="text-red-500">(*)</span>
            </label>
            <input
              type="text"
              id="modelo"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              maxLength="50"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="anio" className="block text-sm font-medium text-gray-700">
              Año
            </label>
            <input
              type="number"
              id="anio"
              name="anio"
              value={formData.anio}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              maxLength="30"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="numero_seguro" className="block text-sm font-medium text-gray-700">
              Número de Seguro
            </label>
            <input
              type="text"
              id="numero_seguro"
              name="numero_seguro"
              value={formData.numero_seguro}
              onChange={handleChange}
              maxLength="50"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fecha_proximo_mantenimiento" className="block text-sm font-medium text-gray-700">
              Fecha Próximo Mantenimiento
            </label>
            <input
              type="date"
              id="fecha_proximo_mantenimiento"
              name="fecha_proximo_mantenimiento"
              value={formData.fecha_proximo_mantenimiento}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              onClick={() => history.push('/admin/Bus/BusPrincipal')}
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
