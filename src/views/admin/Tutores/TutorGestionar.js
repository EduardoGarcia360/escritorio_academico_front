import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function TutorGestionar() {
  const { id, idTutor } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!id) {
      alert('Estudiante no encontrado');
      history.push('/admin/EstudiantePrincipal');
    }
  }, [id, history]);

  const [formData, setFormData] = useState({
    contrasena: '',
    confirmarContrasena: '',
    nombre_completo: '',
    identificacion: '',
    telefono: '',
    correo_electronico: '',
    direccion: '',
    relacion_colegio: '',
    es_responsable_principal: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...formData, id_estudiante: id };

      if (idTutor) {
        const response = await api.put(`tutores/${idTutor}`, payload);
        console.log('actualizar', response)
        if (response.status === 200) {
          alert('Registro actualizado exitosamente');
          history.push(`/admin/Tutores/TutorPrincipal/${id}`);
        } else {
          alert(response.data.message)
        }
      } else {
        const response = await api.post('tutores/', payload);
        console.log('nuevo', response)
        if (response.status === 200) {
          alert('Registro creado exitosamente');
          history.push(`/admin/Tutores/TutorPrincipal/${id}`);
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
    if (idTutor) {
      const fetchData = async () => {
        try {
          const response = await api.get(`tutores/${idTutor}`);
          console.log('tutor seleccionado', response)
          setFormData(response.data);
        } catch (error) {
          console.error('Error al cargar los datos:', error);
          alert('Ocurrió un error al cargar los datos');
        }
      };
      fetchData();
    }
  }, [idTutor]);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <h1 className="text-2xl font-bold mb-4">
          {idTutor ? 'Editar Tutor' : 'Registrar Nuevo Tutor'}
        </h1>
        <form id="tutor" onSubmit={handleSubmit} className="space-y-4">
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
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
              Teléfono <span className="text-red-500">(*)</span>
            </label>
            <input
              type="number"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              maxLength="20"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="correo_electronico" className="block text-sm font-medium text-gray-700">
              Correo Electrónico <span className="text-red-500">(*)</span>
            </label>
            <input
              type="email"
              id="correo_electronico"
              name="correo_electronico"
              value={formData.correo_electronico}
              onChange={handleChange}
              maxLength="100"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
              Dirección <span className="text-red-500">(*)</span>
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              maxLength="255"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="relacion_colegio" className="block text-sm font-medium text-gray-700">
              Relación con el Colegio <span className="text-red-500">(*)</span>
            </label>
            <input
              type="text"
              id="relacion_colegio"
              name="relacion_colegio"
              value={formData.relacion_colegio}
              onChange={handleChange}
              maxLength="50"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="es_responsable_principal"
              name="es_responsable_principal"
              checked={formData.es_responsable_principal}
              onChange={handleChange}
              className="mt-1 mr-2"
            />
            <label htmlFor="es_responsable_principal" className="text-sm font-medium text-gray-700">
              Es Responsable Principal
            </label>
          </div>
          
          {(idTutor && changePassword) || !idTutor ? (
            <>
              <div className="mb-4">
                <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
                  Contraseña <span className="text-red-500">(*)</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="contrasena"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  maxLength="255"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmarContrasena" className="block text-sm font-medium text-gray-700">
                  Confirmar Contraseña <span className="text-red-500">(*)</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmarContrasena"
                  name="confirmarContrasena"
                  value={formData.confirmarContrasena}
                  onChange={handleChange}
                  maxLength="255"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <label htmlFor="showPassword" className="text-sm font-medium text-gray-700">
                  Mostrar Contraseña
                </label>
              </div>
            </>
          ) : null}

          {idTutor && (
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="changePassword"
                checked={changePassword}
                onChange={() => setChangePassword(!changePassword)}
                className="mr-2"
              />
              <label htmlFor="changePassword" className="text-sm font-medium text-gray-700">
                ¿Desea cambiar su contraseña?
              </label>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-lightBlue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-lightBlue-600"
            >
              {idTutor ? 'Actualizar' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={() => history.push(`/admin/Tutores/TutorPrincipal/${id}`)}
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
