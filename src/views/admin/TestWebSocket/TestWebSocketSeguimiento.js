import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { descifrarString } from 'services/codificar.js';

const SeguimientoWS = () => {
  const socketUrl = "https://escritorioacademicoapi-production.up.railway.app/";
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("");

  useEffect(() => {
    const newSocket = io(socketUrl, {
      transports: ["websocket"],
      reconnection: true,
    });

    newSocket.on("connect", () => {
      console.log("Conexión establecida a Socket.io en Seguimiento");
    });

    newSocket.on("message", (data) => {
      console.log("Mensaje recibido en Seguimiento:", data);
      const mensaje = descifrarString(data.mensaje);
      // Se espera que el mensaje tenga la propiedad "mensaje"
      setMessages((prev) => [...prev, mensaje || data]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [socketUrl]);

  const joinRoom = (roomId) => {
    if (socket && socket.connected) {
      socket.emit("joinRoom", roomId);
      setCurrentRoom(roomId);
      console.log(`Unido a la sala ${roomId}`);
      // Limpiamos los mensajes al cambiar de room
      setMessages([]);
    } else {
      console.error("Socket no está conectado");
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-4">Seguimiento de bus</h1>
      <div className="mb-4">
        <button 
          onClick={() => joinRoom("viaje-sala-123")}
          className="px-4 py-2 bg-emerald-500 text-white rounded mr-2 hover:bg-emerald-600"
        >
          Room 123
        </button>
        <button 
          onClick={() => joinRoom("viaje-sala-456")}
          className="px-4 py-2 bg-lightBlue-500 text-white rounded hover:bg-lightBlue-600"
        >
          Room 456
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-2">Mensajes en {currentRoom}</h2>
      <ul className="list-disc pl-5">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default SeguimientoWS;
