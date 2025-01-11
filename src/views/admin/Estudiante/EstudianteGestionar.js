import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function EstudianteGestionar() {
  const { id } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({
    nombre_completo: '',
    fecha_nacimiento: '',
    identificacion: '',
    direccion: '',
    telefono_contacto: '',
    correo_electronico: '',
    nombre_tutor: '',
    telefono_tutor: '',
    estado_matricula: 'A',
    codigo_estudiante: '',
    sexo: 'M',
    condiciones_especiales: '',
    observaciones: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generarCuotas = async (id_estudiante) => {
    const params = {
      procedureName: "GenerarCuotasEstudiante",
      params: ["id_estudiante", "id_colegio", "id"],
      objParams: { id_estudiante: id_estudiante }
    };
    const response = await api.post("execute-procedure", params);
    console.log('generarCuotas', response)
    history.push('/admin/EstudiantePrincipal');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        const response = await api.put(`estudiantes/${id}`, formData);
        console.log('actualizar', response)
        if (response.status === 200) {
          alert('Registro actualizado exitosamente');
          history.push('/admin/EstudiantePrincipal');
        }
      } else {
        const response = await api.post('estudiantes/', formData);
        console.log('nuevo', response)
        if (response.status === 200) {
          alert('Registro creado exitosamente');
          generarCuotas(response.data.id_estudiante)
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
    if (id) {
      const fetchData = async () => {
        try {
          const response = await api.get(`estudiantes/${id}`);
          console.log('response', response)
          if (response.data) {
            setFormData(response.data);
          } else {
            console.error('Estudiante no encontrado');
            alert('Ocurrió un error al cargar los datos');
            history.push('/admin/EstudiantePrincipal');
          }
        } catch (error) {
          console.error('Error al cargar los datos:', error);
          alert('Ocurrió un error al cargar los datos');
          history.push('/admin/EstudiantePrincipal');
        }
      };
      fetchData();
    }
  }, [id]);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <h1 className="text-2xl font-bold mb-4">
          {id ? 'Editar Estudiante' : 'Registrar Nuevo Estudiante'}
        </h1>
        <form id="estudiante" onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="nombre_completo" className="block text-sm font-medium text-gray-700">
              Nombre Completo <span className="text-red-500">(*)</span>
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
            <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700">
              Fecha de Nacimiento <span className="text-red-500">(*)</span>
            </label>
            <input
              type="date"
              id="fecha_nacimiento"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="identificacion" className="block text-sm font-medium text-gray-700">
              Identificación <span className="text-red-500">(*)</span>
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
            <label htmlFor="telefono_contacto" className="block text-sm font-medium text-gray-700">
              Teléfono de Contacto
            </label>
            <input
              type="text"
              id="telefono_contacto"
              name="telefono_contacto"
              value={formData.telefono_contacto}
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
            <label htmlFor="nombre_tutor" className="block text-sm font-medium text-gray-700">
              Nombre del Tutor
            </label>
            <input
              type="text"
              id="nombre_tutor"
              name="nombre_tutor"
              value={formData.nombre_tutor}
              onChange={handleChange}
              maxLength="100"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="telefono_tutor" className="block text-sm font-medium text-gray-700">
              Teléfono del Tutor
            </label>
            <input
              type="text"
              id="telefono_tutor"
              name="telefono_tutor"
              value={formData.telefono_tutor}
              onChange={handleChange}
              maxLength="20"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="estado_matricula" className="block text-sm font-medium text-gray-700">
              Estado de Matrícula
            </label>
            <select
              id="estado_matricula"
              name="estado_matricula"
              value={formData.estado_matricula}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="A">Activo</option>
              <option value="R">Retirado</option>
              <option value="G">Graduado</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="codigo_estudiante" className="block text-sm font-medium text-gray-700">
              Código del Estudiante <span className="text-red-500">(*)</span>
            </label>
            <input
              type="text"
              id="codigo_estudiante"
              name="codigo_estudiante"
              value={formData.codigo_estudiante}
              onChange={handleChange}
              maxLength="20"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sexo" className="block text-sm font-medium text-gray-700">
              Sexo <span className="text-red-500">(*)</span>
            </label>
            <select
              id="sexo"
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="condiciones_especiales" className="block text-sm font-medium text-gray-700">
              Condiciones Especiales
            </label>
            <input
              type="text"
              id="condiciones_especiales"
              name="condiciones_especiales"
              value={formData.condiciones_especiales}
              onChange={handleChange}
              maxLength="255"
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
              maxLength="255"
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
              onClick={() => history.push('/admin/EstudiantePrincipal')}
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
