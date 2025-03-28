import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "services/api";
import { adjustDate } from "services/utils";

export default function CuentaBancariaPrincipal() {
  const [cuentas, setCuentas] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        const response = await api.get("cuentasbancarias/");
        console.log('response', response)
        setCuentas(response.data);
      } catch (error) {
        console.error("Error al obtener las cuentas bancarias:", error);
        alert("No se pudieron cargar las cuentas bancarias.");
      }
    };

    fetchCuentas();
  }, []);

  const handleNuevo = () => {
    history.push("/admin/CuentaBancaria/CuentaBancariaGestionar");
  };

  const handleEditar = (cuentaId) => {
    history.push(`/admin/CuentaBancaria/CuentaBancariaGestionar/${cuentaId}`);
  };

  const handleEliminar = async (cuentaId) => {
    const confirmar = window.confirm("¿Está seguro que desea eliminar esta cuenta bancaria?");
    if (confirmar) {
      try {
        const response = await api.delete(`cuentasbancarias/${cuentaId}`);
        if (response.status === 200) {
          alert("Cuenta bancaria eliminada correctamente.");
          setCuentas((prevCuentas) => prevCuentas.filter((cuenta) => cuenta.id_cuenta_colegio !== cuentaId));
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error al eliminar la cuenta bancaria:", error);
        alert("Ocurrió un error al intentar eliminar la cuenta bancaria.");
      }
    }
  };

  const renderTipoCuenta = (tipo) => {
    switch (tipo) {
      case "A":
        return "Ahorro";
      case "M":
        return "Monetarias";
      case "C":
        return "Corrientes";
      default:
        return "Desconocido";
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                Listado de Cuentas Bancarias
              </h3>
            </div>
            <div className="w-full flex justify-end px-2 mt-4">
              <button
                className="bg-emerald-500 text-white px-4 py-2 rounded flex items-center ml-2"
                onClick={handleNuevo}
              >
                Nueva Cuenta
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto mt-4">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Nombre Banco
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Número de Cuenta
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Tipo de Cuenta
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Nombre del Titular
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Moneda
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
              {cuentas.map((cuenta) => (
                <tr key={cuenta.id_cuenta_colegio}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {cuenta.nombre_banco}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {cuenta.numero_cuenta}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {renderTipoCuenta(cuenta.tipo_cuenta)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {cuenta.nombre_titular}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {cuenta.moneda}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {adjustDate(cuenta.createdAt)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-lightBlue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEditar(cuenta.id_cuenta_colegio)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleEliminar(cuenta.id_cuenta_colegio)}
                    >
                      Eliminar
                    </button>
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
