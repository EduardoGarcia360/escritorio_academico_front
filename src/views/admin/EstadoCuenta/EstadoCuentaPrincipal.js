import React, { useState, useEffect } from "react";
import { api } from "services/api";

export default function EstadoCuentaPrincipal() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [idEstudiante, setIdEstudiante] = useState("");
  const [estadoCuenta, setEstadoCuenta] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  const fetchEstudiantes = async () => {
    try {
      const response = await api.get("estudiantes/usuariotutor/1");
      console.log('fetchEstudiantes', response);
      setEstudiantes(response.data);
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
      alert("No se pudieron cargar los estudiantes.");
    }
  };

  useEffect(() => {
    if (hasMounted) {
      fetchEstudiantes();
    }
  }, [hasMounted]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleBuscar = async () => {
    if (!idEstudiante) {
      alert("Seleccione un estudiante para buscar.");
      return;
    }
    try {
      const params = {
        procedureName: "estadocuentaestudiante",
        params: ["id_colegio", "id", "id_estudiante"],
        objParams: { id_estudiante: idEstudiante },
      };
      const response = await api.post("execute-procedure", params);
      console.log('handleBuscar', response);
      setEstadoCuenta(response.data.results);
    } catch (error) {
      console.error("Error al obtener el estado de cuenta:", error);
      alert("No se pudo obtener el estado de cuenta del estudiante.");
    }
  };

  const renderEstado = (estado) => {
    let colorClass = "";
    let descripcion = "";
    switch (estado) {
      case "P":
        colorClass = "text-red-500";
        descripcion = "Pendiente";
        break;
      case "R":
        colorClass = "text-orange-500";
        descripcion = "Parcial";
        break;
      case "G":
        colorClass = "text-emerald-500";
        descripcion = "Pagada";
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

  const adjustDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString();
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 p-6">
      <h3 className="font-semibold text-lg text-blueGray-700 mb-4">Estado de Cuenta</h3>
      <div className="flex items-center space-x-4 mb-6">
        <select
          className="border px-4 py-2 rounded w-1/3"
          value={idEstudiante}
          onChange={(e) => setIdEstudiante(e.target.value)}
        >
          <option value="">Seleccione un estudiante</option>
          {estudiantes!= null && estudiantes.map((estudiante) => (
            <option key={estudiante.id_estudiante} value={estudiante.id_estudiante}>
              {estudiante.nombre_completo}
            </option>
          ))}
        </select>
        <button
          className="bg-lightBlue-500 text-white px-4 py-2 rounded flex items-center"
          onClick={handleBuscar}
        >
          <i className="fas fa-search mr-2"></i> Buscar
        </button>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Periodo
              </th>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Monto
              </th>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Estado
              </th>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Fecha Vencimiento
              </th>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Monto Pagado
              </th>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Fecha Pago
              </th>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Número Boleta
              </th>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Fecha Boleta
              </th>
            </tr>
          </thead>
          <tbody>
            {estadoCuenta.map((cuota) => (
              <tr key={cuota.id_cuota_estudiante}>
                <td className="border-t-0 px-6 py-4 text-xs text-left">{cuota.periodo}</td>
                <td className="border-t-0 px-6 py-4 text-xs text-left">{cuota.monto}</td>
                <td className="border-t-0 px-6 py-4 text-xs text-left">{renderEstado(cuota.estado)}</td>
                <td className="border-t-0 px-6 py-4 text-xs text-left">{adjustDate(cuota.fecha_vencimiento)}</td>
                <td className={`border-t-0 px-6 py-4 text-xs text-left ${cuota.monto_pagado ? 'bg-orange-200' : ''}`}>{cuota.monto_pagado}</td>
                <td className={`border-t-0 px-6 py-4 text-xs text-left ${cuota.fecha_pago ? 'bg-orange-200' : ''}`}>{adjustDate(cuota.fecha_pago)}</td>
                <td className={`border-t-0 px-6 py-4 text-xs text-left ${cuota.numero_boleta ? 'bg-lightBlue-200' : ''}`}>{cuota.numero_boleta}</td>
                <td className={`border-t-0 px-6 py-4 text-xs text-left ${cuota.fecha_boleta ? 'bg-lightBlue-200' : ''}`}>{adjustDate(cuota.fecha_boleta)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
