import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function PersonalDocenteGestionar() {
  const { id } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({
    nombre_completo: '',
    identificacion: '',
    telefono: '',
    correo_electronico: '',
    direccion: '',
    titulo_academico: '',
    codigo_empleado: '',
    fecha_ingreso: '',
    fecha_egreso: '',
    especialidad: '',
    estado_empleo: 'A',
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await api.get(`personaldocente/${id}`);
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

    try {
      if (id) {
        await api.put(`personaldocente/${id}`, formData);
        alert('Registro actualizado exitosamente');
      } else {
        await api.post('personaldocente/', formData);
        alert('Registro creado exitosamente');
      }
      history.push('/admin/PersonalDocente/PersonalDocentePrincipal');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Ocurrió un error al guardar los datos');
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <h1 className="text-2xl font-bold mb-4">
          {id ? 'Editar Personal Docente' : 'Registrar Nuevo Personal Docente'}
        </h1>
        <form id="personal-docente" onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="nombre_completo" className="block text-sm font-medium text-gray-700">
              Nombre Completo
            </label>
            <input
              type="text"
              id="nombre_completo"
              name="nombre_completo"
              value={formData.nombre_completo}
              onChange={handleChange}
              maxLength="100"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="identificacion" className="block text-sm font-medium text-gray-700">
              Identificación
            </label>
            <input
              type="text"
              id="identificacion"
              name="identificacion"
              value={formData.identificacion}
              onChange={handleChange}
              maxLength="50"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              maxLength="20"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="correo_electronico" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correo_electronico"
              name="correo_electronico"
              value={formData.correo_electronico}
              onChange={handleChange}
              maxLength="100"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              maxLength="255"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="titulo_academico" className="block text-sm font-medium text-gray-700">
              Título Académico
            </label>
            <input
              type="text"
              id="titulo_academico"
              name="titulo_academico"
              value={formData.titulo_academico}
              onChange={handleChange}
              maxLength="100"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="codigo_empleado" className="block text-sm font-medium text-gray-700">
              Código de Empleado
            </label>
            <input
              type="text"
              id="codigo_empleado"
              name="codigo_empleado"
              value={formData.codigo_empleado}
              onChange={handleChange}
              maxLength="20"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fecha_ingreso" className="block text-sm font-medium text-gray-700">
              Fecha de Ingreso
            </label>
            <input
              type="date"
              id="fecha_ingreso"
              name="fecha_ingreso"
              value={formData.fecha_ingreso}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fecha_egreso" className="block text-sm font-medium text-gray-700">
              Fecha de Egreso
            </label>
            <input
              type="date"
              id="fecha_egreso"
              name="fecha_egreso"
              value={formData.fecha_egreso}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="especialidad" className="block text-sm font-medium text-gray-700">
              Especialidad
            </label>
            <input
              type="text"
              id="especialidad"
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              maxLength="50"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="estado_empleo" className="block text-sm font-medium text-gray-700">
              Estado de Empleo
            </label>
            <select
              id="estado_empleo"
              name="estado_empleo"
              value={formData.estado_empleo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="A">Activo</option>
              <option value="L">Licencia</option>
              <option value="R">Retirado</option>
            </select>
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
              onClick={() => history.push('/admin/PersonalDocente/PersonalDocentePrincipal')}
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
