// /src/views/ActividadEscolar/Principal.js

import React, { useState, useEffect } from 'react';
import WebSocketManager from 'services/websocketManager.js';

const IniciarWS = () => {
  // Nota: Para Socket.io, es recomendable usar la URL con protocolo HTTPS
  const socketUrl = "https://escritorioacademicoapi-production.up.railway.app/";
  const [wsManager, setWsManager] = useState(null);

  const iniciarViaje = () => {
    if (!wsManager) {
      // Se crea la conexión usando el room "viaje-sala-123"
      const manager = new WebSocketManager(socketUrl, "viaje-sala-123");
      manager.conectar();
      setWsManager(manager);
      // Una vez conectados, inicia el envío periódico
      manager.socket.on("connect", () => {
        manager.iniciarEnvioPeriodo();
      });
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <button
        onClick={iniciarViaje}
        className="px-6 py-3 bg-emerald-500 text-white rounded hover:bg-emerald-600 focus:outline-none"
      >
        Iniciar Viaje
      </button>
      <button
        onClick={detenerViaje}
        className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
      >
        Detener Viaje
      </button>
    </div>
  );
};

export default IniciarWS;
