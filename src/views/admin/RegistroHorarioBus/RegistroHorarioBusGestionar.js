import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { api } from "services/api";
import { formatearFechaDateTime } from "services/utils.js";
import WebSocketManager from "services/websocketManager.js";

export default function RegistroHorarioBusGestionar() {
  const { idAsignacionTransporte } = useParams();
  const history = useHistory();
  const socketUrl = process.env.REACT_APP_SOCKET_URL;
  const [wsManager, setWsManager] = useState(null);

  const [actividadInfo, setActividadInfo] = useState(null);
  const [maestroInfo, setMaestroInfo] = useState(null);
  const [registroHorario, setRegistroHorario] = useState([]);
  const [estadoBotones, setEstadoBotones] = useState({
    iniciar: true,
    retorno: false,
    llegada: false,
    finalizar: false,
  });
  const [registroActividad, setRegistroActividad] = useState({ estado: "F" });
  const [codigoSala, setCodigoSala] = useState(null);

  useEffect(() => {
    if (!idAsignacionTransporte) {
      alert("Parámetro faltante en la URL");
      history.push("/admin/CicloEscolar/CicloEscolarPrincipal");
      return;
    }

    const consultarRegistro = async () => {
      const response = await api.get(
        `asignacionestransporteextra/${idAsignacionTransporte}`
      );
      console.log("registro", response);
      const actividad = response.data;
      setRegistroActividad(actividad);
      setCodigoSala(
        `ACTIVIDAD-${actividad.id_asignacion_transporte}-${actividad.id_asignacion}-${actividad.id_bus}-${actividad.id_docente}`
      );
    };

    const fetchActividadInfo = async () => {
      try {
        const response = await api.post("execute-procedure", {
          procedureName: "miasignacioninfoactividad",
          params: ["id_asignacion_transporte"],
          objParams: { id_asignacion_transporte: idAsignacionTransporte },
        });
        console.log("info actividad", response);
        if (response.status === 200) {
          setActividadInfo(response.data.results[0]);
        }
      } catch (error) {
        console.error("Error al cargar la información de la actividad:", error);
        alert("Ocurrió un error al cargar la información de la actividad");
      }
    };

    const fetchMaestroInfo = async () => {
      try {
        const response = await api.post("execute-procedure", {
          procedureName: "miasignacionmaestroasignado",
          params: ["id_asignacion_transporte"],
          objParams: { id_asignacion_transporte: idAsignacionTransporte },
        });
        console.log("info maestro", response);
        if (response.status === 200) {
          setMaestroInfo(response.data.results[0]);
        }
      } catch (error) {
        console.error("Error al cargar la información del maestro:", error);
        alert("Ocurrió un error al cargar la información del maestro");
      }
    };

    consultarRegistro();
    fetchActividadInfo();
    fetchMaestroInfo();
    handleGetRegistros();
  }, [idAsignacionTransporte, history]);

  const handleButtonClick = (boton) => {
    setEstadoBotones((prev) => {
      const nuevoEstado = { ...prev };
      switch (boton) {
        case "iniciar":
          nuevoEstado.iniciar = false;
          nuevoEstado.retorno = false;
          nuevoEstado.llegada = true;
          break;
        case "llegada":
          nuevoEstado.llegada = false;
          nuevoEstado.finalizar = false;
          nuevoEstado.retorno = true;
          break;
        case "retorno":
          nuevoEstado.retorno = false;
          nuevoEstado.finalizar = true;
          break;
        case "finalizar":
          nuevoEstado.finalizar = false;
          break;
        default:
          break;
      }
      return nuevoEstado;
    });

    // se genera un registro de tiempo
    const tipoRegistro = boton === "iniciar" || boton === "retorno" ? "S" : "L";
    handleSaveRegistro(tipoRegistro, boton === "finalizar");

    // se valida el envio del socket
    if (boton === "iniciar" || boton === "retorno") {
      iniciarViaje();
    } else if (boton === "llegada" || boton === "finalizar") {
      detenerViaje();
    }
  };

  const handleSaveRegistro = async (tipoRegistro, esFinalizar) => {
    const formData = {
      id_asignacion_transporte: idAsignacionTransporte,
      tipo_registro: tipoRegistro,
      latitud: null,
      longitud: null,
      observaciones: null,
      estado: esFinalizar ? "F" : "A",
    };
    const response = await api.post("registroshorariobus/", formData);
    console.log("REGISTRO", response);
    if (response.status === 200) {
      handleGetRegistros();
    } else {
      alert(response.data.message);
    }
  };

  const handleGetRegistros = async () => {
    const response = await api.get(
      `registroshorariobus/${idAsignacionTransporte}`
    );
    console.log("LISTADO", response);
    setRegistroHorario(response.data);
  };

  const getRegistroTexto = (registro) => {
    const salidaLlegada = registro.tipo_registro === "S" ? "Salida" : "Llegada";
    const finalizado = registro.estado === "F" ? " - Actividad Finalizada" : "";
    return `${salidaLlegada} - ${formatearFechaDateTime(
      registro.fecha_hora
    )}${finalizado}`;
  };

  const iniciarViaje = () => {
    // Si no existe el manager, se crea y se conecta
    if (!wsManager) {
      const manager = new WebSocketManager(socketUrl, codigoSala);
      manager.conectar();
      setWsManager(manager);
      // Una vez conectados, iniciar el envío periódico
      manager.socket.on("connect", () => {
        manager.iniciarEnvioPeriodo();
      });
    } else {
      // Si ya existe, reiniciar el envío periódico si está detenido
      if (!wsManager.intervalId) {
        wsManager.iniciarEnvioPeriodo();
        console.log("Reiniciando envío periódico");
      }
    }
  };

  const detenerViaje = () => {
    if (wsManager) {
      wsManager.detenerEnvioPeriodo();
    }
  };

  // Limpia la conexión al desmontar el componente
  useEffect(() => {
    return () => {
      if (wsManager) {
        wsManager.cerrarConexion();
      }
    };
  }, [wsManager]);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <h1 className="text-2xl font-bold mb-4">Registro Horario Bus</h1>
        <div id="informacion" className="flex flex-wrap -mx-4 mb-4 mt-4">
          {/* Información de la Actividad */}
          <div className="w-1/2 px-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4">
                Información de la Actividad
              </h2>
              {actividadInfo ? (
                <ul className="space-y-2">
                  <li>
                    <strong className="text-right">Piloto:</strong>{" "}
                    {actividadInfo.nombre_piloto}
                  </li>
                  <li>
                    <strong className="text-right">Licencia:</strong>{" "}
                    {actividadInfo.licencia}
                  </li>
                  <li>
                    <strong className="text-right">
                      Información Adicional:
                    </strong>{" "}
                    {actividadInfo.desc_info_adicional}
                  </li>
                  <li>
                    <strong className="text-right">Fecha Asignación:</strong>{" "}
                    {actividadInfo.fecha_asignacion}
                  </li>
                  <li>
                    <strong className="text-right">Fecha Gasto:</strong>{" "}
                    {actividadInfo.fecha_gasto}
                  </li>
                  <li>
                    <strong className="text-right">Nombre del Gasto:</strong>{" "}
                    {actividadInfo.nombre_gasto}
                  </li>
                  <li>
                    <strong className="text-right">Monto:</strong>{" "}
                    {actividadInfo.monto}
                  </li>
                  <li>
                    <strong className="text-right">
                      Descripción del Gasto:
                    </strong>{" "}
                    {actividadInfo.desc_gasto}
                  </li>
                </ul>
              ) : (
                <p>Cargando información de la actividad...</p>
              )}
            </div>
          </div>
          {/* Información del Maestro */}
          <div className="w-1/2 px-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4">
                Información del Maestro
              </h2>
              {maestroInfo ? (
                <ul className="space-y-2">
                  <li>
                    <strong className="text-right">Nombre:</strong>{" "}
                    {maestroInfo.nombre_completo}
                  </li>
                  <li>
                    <strong className="text-right">Código de Empleado:</strong>{" "}
                    {maestroInfo.codigo_empleado}
                  </li>
                  <li>
                    <strong className="text-right">Especialidad:</strong>{" "}
                    {maestroInfo.especialidad}
                  </li>
                </ul>
              ) : (
                <p>Cargando información del maestro...</p>
              )}
            </div>
          </div>
        </div>
        {registroActividad.estado === "A" && (
          <div id="botones" className="flex justify-center space-x-4 mt-4">
            <button
              onClick={() => handleButtonClick("iniciar")}
              className={`py-2 px-4 font-bold rounded ${
                estadoBotones.iniciar ? "bg-emerald-500" : "bg-gray-500"
              }`}
              hidden={!estadoBotones.iniciar}
            >
              Iniciar
            </button>
            <button
              onClick={() => handleButtonClick("retorno")}
              className={`py-2 px-4 font-bold rounded ${
                estadoBotones.retorno ? "bg-lightBlue-500" : "bg-gray-500"
              }`}
              hidden={!estadoBotones.retorno}
            >
              Retorno
            </button>
            <button
              onClick={() => handleButtonClick("llegada")}
              className={`py-2 px-4 font-bold rounded ${
                estadoBotones.llegada ? "bg-orange-500" : "bg-gray-500"
              }`}
              hidden={!estadoBotones.llegada}
            >
              Llegada
            </button>
            <button
              onClick={() => handleButtonClick("finalizar")}
              className={`py-2 px-4 font-bold rounded ${
                estadoBotones.finalizar ? "bg-red-500" : "bg-gray-500"
              }`}
              hidden={!estadoBotones.finalizar}
            >
              Finalizar
            </button>
          </div>
        )}
        <div id="registros">
          <ul className="list-disc pl-5">
            {registroHorario.map((registro) => (
              <li
                style={{ listStyleType: "square" }}
                key={registro.id_registro_horario}
              >
                {getRegistroTexto(registro)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
