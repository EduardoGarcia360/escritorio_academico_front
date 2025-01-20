import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "services/api";

export default function UsuarioPrincipal() {
  const [usuarios, setUsuarios] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get("usuarioscolegios/colegio/");
        console.log('usuarios', response)
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        alert("No se pudieron cargar los usuarios.");
      }
    };

    fetchUsuarios();
  }, []);

  const handleNuevo = () => {
    history.push("/admin/Usuario/UsuarioGestionar");
  };

  const handleEditar = (usuarioId) => {
    history.push(`/admin/Usuario/UsuarioGestionar/${usuarioId}`);
  };

  const handleInactivar = async (usuarioId) => {
    const confirmar = window.confirm("¿Está seguro que desea inactivar este usuario?");
    if (confirmar) {
      try {
        const response = await api.put(`usuarios/inactivar/${usuarioId}`, { estado: 'I' });
        if (response.status === 200) {
          alert("Usuario inactivado correctamente.");
          setUsuarios((prevUsuarios) =>
            prevUsuarios.map((usuario) =>
              usuario.id_usuario === usuarioId
                ? { ...usuario, estado: "I" }
                : usuario
            )
          );
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error al inactivar el usuario:", error);
        alert("Ocurrió un error al intentar inactivar el usuario.");
      }
    }
  };

  const renderRol = (rol) => {
    switch (rol) {
      case "A":
        return "Administrador";
      case "D":
        return "Docente";
      case "E":
        return "Estudiante";
      case "O":
        return "Otro";
      default:
        return "Desconocido";
    }
  };

  const renderEstado = (estado) => {
    let colorClass = "";
    let descripcion = "";
    switch (estado) {
      case "A":
        colorClass = "text-emerald-500";
        descripcion = "Activo";
        break;
      case "I":
        colorClass = "text-red-500";
        descripcion = "Inactivo";
        break;
      default:
        descripcion = "Desconocido";
    }
    return (
      <span className="flex items-center">
        <i className={`fas fa-circle ${colorClass} mr-2`}></i>
        {descripcion}
      </span>
    );
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                Listado de Usuarios
              </h3>
            </div>
            <div className="w-full flex justify-end px-2 mt-4">
              <button
                className="bg-emerald-500 text-white px-4 py-2 rounded flex items-center ml-2"
                onClick={handleNuevo}
              >
                Nuevo Usuario
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto mt-4">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Usuario
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Nombre Completo
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Correo Electrónico
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Rol
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Estado
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Fecha Creación
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id_usuario}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {usuario.nombre_usuario}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {usuario.nombre_completo}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {usuario.correo_electronico}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {renderRol(usuario.rol)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {renderEstado(usuario.estado)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {new Date(usuario.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-lightBlue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEditar(usuario.id_usuario)}
                    >
                      Editar
                    </button>
                    {usuario.estado === "A" && (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleInactivar(usuario.id_usuario)}
                      >
                        Inactivar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
