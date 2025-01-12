import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";

export default function CuentaBancariaGestionar() {
  const { id } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({
    id_banco: '',
    numero_cuenta: '',
    tipo_cuenta: '',
    nombre_titular: '',
    moneda: '',
  });
  const [bancos, setBancos] = useState([]);

  useEffect(() => {
    const fetchBancos = async () => {
      try {
        const response = await api.get('bancos/');
        setBancos(response.data || []);
      } catch (error) {
        console.error('Error al cargar los bancos:', error);
        alert('Ocurrió un error al cargar los bancos');
      }
    };

    fetchBancos();

    if (id) {
      const fetchData = async () => {
        try {
          const response = await api.get(`cuentasbancarias/${id}`);
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

    if (!formData.id_banco || !formData.numero_cuenta || !formData.tipo_cuenta || !formData.nombre_titular) {
      alert('Los campos marcados con (*) son obligatorios');
      return;
    }

    try {
      if (id) {
        await api.put(`cuentasbancarias/${id}`, formData);
        alert('Registro actualizado exitosamente');
      } else {
        await api.post('cuentasbancarias/', formData);
        alert('Registro creado exitosamente');
      }
      history.push('/admin/CuentaBancaria/CuentaBancariaPrincipal');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Ocurrió un error al guardar los datos');
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <h1 className="text-2xl font-bold mb-4">
          {id ? 'Editar Cuenta Bancaria' : 'Registrar Nueva Cuenta Bancaria'}
        </h1>
        <form id="cuenta-bancaria" onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="id_banco" className="block text-sm font-medium text-gray-700">
              Banco <span className="text-red-500">(*)</span>
            </label>
            <select
              id="id_banco"
              name="id_banco"
              value={formData.id_banco}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="">Seleccione</option>
              {bancos.map((banco) => (
                <option key={banco.id_banco} value={banco.id_banco}>
                  {banco.nombre_banco}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="numero_cuenta" className="block text-sm font-medium text-gray-700">
              Número de Cuenta <span className="text-red-500">(*)</span>
            </label>
            <input
              type="number"
              id="numero_cuenta"
              name="numero_cuenta"
              value={formData.numero_cuenta}
              onChange={handleChange}
              maxLength="50"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tipo_cuenta" className="block text-sm font-medium text-gray-700">
              Tipo de Cuenta <span className="text-red-500">(*)</span>
            </label>
            <select
              id="tipo_cuenta"
              name="tipo_cuenta"
              value={formData.tipo_cuenta}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="">Seleccione</option>
              <option value="A">Ahorro</option>
              <option value="M">Monetaria</option>
              <option value="C">Corriente</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="nombre_titular" className="block text-sm font-medium text-gray-700">
              Nombre del Titular <span className="text-red-500">(*)</span>
            </label>
            <input
              type="text"
              id="nombre_titular"
              name="nombre_titular"
              value={formData.nombre_titular}
              onChange={handleChange}
              maxLength="100"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="moneda" className="block text-sm font-medium text-gray-700">
              Moneda
            </label>
            <input
              type="text"
              id="moneda"
              name="moneda"
              value={formData.moneda}
              onChange={handleChange}
              maxLength="10"
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
              onClick={() => history.push('/admin/CuentaBancaria/CuentaBancariaPrincipal')}
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
