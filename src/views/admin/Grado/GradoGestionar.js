import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function GradoGestionar() {
  const { idCiclo, idJornadaCiclo, idGrado } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({
    nombre: '',
    seccion: '',
    descripcion: '',
  });
  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    if (!idCiclo || !idJornadaCiclo) {
      alert('Ciclo o Jornada no encontrados');
      history.push('/admin/CicloEscolar/CicloEscolarPrincipal');
      return;
    }

    const fetchSecciones = async () => {
      try {
        const response = await api.get('secciones');
        setSecciones(response.data || []);
      } catch (error) {
        console.error('Error al cargar las secciones:', error);
        alert('Ocurrió un error al cargar las secciones');
      }
    };

    fetchSecciones();

    if (idGrado) {
      const fetchGrado = async () => {
        try {
          const response = await api.get(`grados/${idGrado}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error al cargar los datos del grado:', error);
          alert('Ocurrió un error al cargar los datos del grado');
        }
      };
      fetchGrado();
    }
  }, [idCiclo, idJornadaCiclo, idGrado, history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData, id_jornada_ciclo: idJornadaCiclo };

    try {
      if (idGrado) {
        const response = await api.put(`grados/${idGrado}`, payload);
        console.log('actualizar', response)
        if (response.status === 200) {
          alert('Registro actualizado exitosamente');
          history.push(`/admin/Grado/GradoPrincipal/${idCiclo}/jornada/${idJornadaCiclo}`);
        } else {
          alert(response.data.message)
        }
      } else {
        const response = await api.post('grados/', payload);
        console.log('nuevo', response)
        if (response.status === 200) {
          alert('Registro creado exitosamente');
          history.push(`/admin/Grado/GradoPrincipal/${idCiclo}/jornada/${idJornadaCiclo}`);
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
          {idGrado ? 'Editar Grado' : 'Registrar Nuevo Grado'}
        </h1>
        <form id="grado" onSubmit={handleSubmit} className="space-y-4">
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
            <label htmlFor="seccion" className="block text-sm font-medium text-gray-700">
              Sección <span className="text-red-500">(*)</span>
            </label>
            <select
              id="seccion"
              name="seccion"
              value={formData.seccion}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="">Seleccione</option>
              {secciones.map((seccion) => (
                <option key={seccion.nombre} value={seccion.nombre}>
                  {seccion.nombre}
                </option>
              ))}
            </select>
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
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-lightBlue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-lightBlue-600"
            >
              {idGrado ? 'Actualizar' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={() => history.push(`/admin/Grado/GradoPrincipal/${idCiclo}/jornada/${idJornadaCiclo}`)}
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
