import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { api } from "services/api";

export default function UsuarioGestionar() {
  const { id } = useParams();
  const history = useHistory();

  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    contrasena: '',
    confirmarContrasena: '',
    nombre_completo: '',
    correo_electronico: '',
    rol: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('rolesusuario');
        setRoles(response.data || []);
      } catch (error) {
        console.error('Error al cargar los roles:', error);
        alert('Ocurrió un error al cargar los roles');
      }
    };

    const fetchUsuario = async () => {
      if (id) {
        try {
          const response = await api.get(`usuarios/${id}`);
          setFormData({
            ...response.data,
            contrasena: '',
            confirmarContrasena: '',
          });
        } catch (error) {
          console.error('Error al cargar los datos del usuario:', error);
          alert('Ocurrió un error al cargar los datos del usuario');
        }
      }
    };

    fetchRoles();
    fetchUsuario();
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

    if (!formData.nombre_usuario || !formData.nombre_completo || !formData.correo_electronico || !formData.rol) {
      alert('Todos los campos marcados con (*) son obligatorios');
      return;
    }

    const payload = { ...formData };

    if (id) {
      if (!changePassword) {
        delete payload.contrasena;
        delete payload.confirmarContrasena;
      } else if (formData.contrasena !== formData.confirmarContrasena) {
        alert('Las contraseñas no coinciden');
        return;
      }
    } else {
      if (formData.contrasena !== formData.confirmarContrasena) {
        alert('Las contraseñas no coinciden');
        return;
      }
    }

    try {
      let response;
      if (id) {
        response = await api.put(`usuarios/${id}`, payload);
      } else {
        response = await api.post('usuarios/', payload);
      }

      if (response.status === 200) {
        alert('Operación realizada exitosamente');
        history.push('/admin/Usuario/UsuarioPrincipal');
      } else {
        alert(response.data.message);
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
          {id ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}
        </h1>
        <form id="usuario" onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="nombre_usuario" className="block text-sm font-medium text-gray-700">
              Nombre de Usuario <span className="text-red-500">(*)</span>
            </label>
            <input
              type="text"
              id="nombre_usuario"
              name="nombre_usuario"
              value={formData.nombre_usuario}
              onChange={handleChange}
              maxLength="50"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
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
            <label htmlFor="rol" className="block text-sm font-medium text-gray-700">
              Rol <span className="text-red-500">(*)</span>
            </label>
            <select
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="">Seleccione</option>
              {roles.map((rol) => (
                <option key={rol.valor} value={rol.valor}>
                  {rol.nombre}
                </option>
              ))}
            </select>
          </div>

          {(id && changePassword) || !id ? (
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

          {id && (
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
              {id ? 'Actualizar' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={() => history.push('/admin/Usuario/UsuarioPrincipal')}
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
