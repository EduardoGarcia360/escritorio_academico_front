import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "services/api";
import { adjustDate } from "services/utils";

export default function CuotaColegioPrincipal() {
  const [cuotas, setCuotas] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchCuotas = async () => {
      try {
        const response = await api.get("cuotascolegio/");
        setCuotas(response.data);
      } catch (error) {
        console.error("Error al obtener las cuotas del colegio:", error);
        alert("No se pudieron cargar las cuotas del colegio.");
      }
    };

    fetchCuotas();
  }, []);

  const handleNuevo = () => {
    history.push("/admin/CuotaColegio/CuotaColegioGestionar");
  };

  const handleEditar = (cuotaId) => {
    history.push(`/admin/CuotaColegio/CuotaColegioGestionar/${cuotaId}`);
  };

  const handleEliminar = async (cuotaId) => {
    const confirmar = window.confirm("¿Está seguro que desea eliminar esta cuota?");
    if (confirmar) {
      try {
        const response = await api.delete(`cuotascolegio/${cuotaId}`);
        if (response.status === 200) {
          alert("Cuota eliminada correctamente.");
          setCuotas((prevCuotas) => prevCuotas.filter((cuota) => cuota.id_cuota !== cuotaId));
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error al eliminar la cuota:", error);
        alert("Ocurrió un error al intentar eliminar la cuota.");
      }
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                Listado de Cuotas del Colegio
              </h3>
            </div>
            <div className="w-full flex justify-end px-2 mt-4">
              <button
                className="bg-emerald-500 text-white px-4 py-2 rounded flex items-center ml-2"
                onClick={handleNuevo}
              >
                Nueva Cuota
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto mt-4">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Nombre Cuota
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Periodicidad
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Monto
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
              {cuotas.map((cuota) => (
                <tr key={cuota.id_cuota}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {cuota.nombre_cuota}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {cuota.periodicidad}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {cuota.monto}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {adjustDate(cuota.createdAt)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-lightBlue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEditar(cuota.id_cuota)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleEliminar(cuota.id_cuota)}
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
