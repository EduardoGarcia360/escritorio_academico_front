import React, { useEffect, useState } from 'react';
import WebSocketManager from 'services/websocketManager.js';

const SeguimientoWS = () => {
  const [messages, setMessages] = useState([]);
  const wsUrl = `wss://${process.env.REACT_APP_HOST_NAME}`;

  useEffect(() => {
    const manager = new WebSocketManager(wsUrl);
    manager.conectar();

    // Cuando se abre la conexión, podemos confirmar la conexión en consola
    manager.socket.addEventListener('open', () => {
      console.log('Seguimiento - Conexión abierta');
    });

    // Escuchamos el evento "message" y actualizamos el estado para listar los mensajes
    manager.socket.addEventListener('message', (event) => {
      console.log('Seguimiento - Mensaje recibido:', event.data);
      setMessages(prevMessages => [...prevMessages, event.data]);
    });

    // Limpiamos la conexión al desmontar el componente
    return () => {
      manager.cerrarConexion();
    };
  }, [wsUrl]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Seguimiento de bus</h1>
      <ul className="list-disc pl-5">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default SeguimientoWS;
