import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

const SeguimientoWS = () => {
  const [messages, setMessages] = useState([]);
  // Usamos la misma URL de conexión
  const socketUrl = "https://escritorioacademicoapi-production.up.railway.app/";

  useEffect(() => {
    const socket = io(socketUrl, {
      transports: ["websocket"],
      reconnection: true,
    });

    socket.on("connect", () => {
      console.log("Conexión establecida a Socket.io en Seguimiento");
    });

    socket.on("message", (data) => {
      console.log("Mensaje recibido en Seguimiento:", data);
      // Se asume que el mensaje viene en la propiedad "mensaje"
      setMessages((prevMessages) => [...prevMessages, data.mensaje || data]);
    });

    socket.on("disconnect", () => {
      console.log("Desconexión de Socket.io en Seguimiento");
    });

    return () => {
      socket.disconnect();
    };
  }, [socketUrl]);

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
