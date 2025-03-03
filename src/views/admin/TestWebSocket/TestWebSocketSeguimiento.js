import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { descifrarString } from 'services/codificar.js';
import { api } from "services/api";

const SeguimientoWS = () => {
  const socketUrl = process.env.REACT_APP_SOCKET_URL;
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("");

  useEffect(() => {
    const newSocket = io(socketUrl, {
      transports: ["websocket"],
      path: "/socket.io/",
      reconnection: true,
      upgrade: false,
    });

    newSocket.on("connect", () => {
      console.log("Conexión establecida a Socket.io en Seguimiento");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Error en conexión:", error);
    });

    newSocket.on("reconnect_attempt", (attempt) => {
      console.log("Intento de reconexión:", attempt);
    });

    newSocket.on("message", (data) => {
      if (!data) return;
      console.log("Mensaje recibido en Seguimiento:", data);
      const decodeData = descifrarString(data);
      console.log('decodeData', decodeData);

      const dataParse = JSON.parse(decodeData);
      console.log('dataParse', dataParse);

      const logPagina = `${dataParse.texto} ${dataParse.location}`;

      handleSave(dataParse.location);
      setMessages((prev) => [...prev, logPagina || data]);
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

  const handleSave = async (strLocation) => {
    const location = JSON.parse(strLocation);
    console.log('handleSave', location)
    const formData = {
      id_asignacion_transporte: 1,
      latitud: location.latitude,
      longitud: location.longitude,
      accuracy: location.accuracy,
      altitude: location.altitude,
      altitude_accuracy: location.altitude_accuracy,
      simulated: location.simulated,
      speed: location.speed,
      bearing: location.bearing,
      time: location.time
    }
    console.log('FORM DATA', formData)
    const response = await api.post('coordenadasbus/', formData)
    console.log('INSERCION', JSON.stringify(response.data));
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
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
              <li style={{ listStyleType: 'square' }} key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SeguimientoWS;
