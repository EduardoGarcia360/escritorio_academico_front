import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function CuotaColegioGestionar() {
  const { id } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({
    nombre_cuota: '',
    monto: '',
    periodicidad: '',
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await api.get(`cuotascolegio/${id}`);
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

    if (!formData.nombre_cuota || !formData.monto) {
      alert('Los campos marcados con (*) son obligatorios');
      return;
    }

    try {
      if (id) {
        const response = await api.put(`cuotascolegio/${id}`, formData);
        console.log('actualizar', response)
        if (response.status === 200) {
          alert('Registro actualizado exitosamente');
          history.push('/admin/CuotaColegio/CuotaColegioPrincipal');
        } else {
          alert(response.data.message)
        }
      } else {
        const response = await api.post('cuotascolegio/', formData);
        console.log('nuevo', response)
        if (response.status === 200) {
          alert('Registro creado exitosamente');
          history.push('/admin/CuotaColegio/CuotaColegioPrincipal');
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
          {id ? 'Editar Cuota Colegio' : 'Registrar Nueva Cuota Colegio'}
        </h1>
        <form id="cuota-colegio" onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="nombre_cuota" className="block text-sm font-medium text-gray-700">
              Nombre de la Cuota <span className="text-red-500">(*)</span>
            </label>
            <input
              type="text"
              id="nombre_cuota"
              name="nombre_cuota"
              value={formData.nombre_cuota}
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
            <label htmlFor="periodicidad" className="block text-sm font-medium text-gray-700">
              Periodicidad
            </label>
            <input
              type="text"
              id="periodicidad"
              name="periodicidad"
              value={formData.periodicidad}
              onChange={handleChange}
              maxLength="50"
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
              onClick={() => history.push('/admin/CuotaColegio/CuotaColegioPrincipal')}
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
