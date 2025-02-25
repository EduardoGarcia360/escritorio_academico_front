// /src/services/websocketManager.js
import { io } from "socket.io-client";
import { cifrarString } from "./codificar.js";

class WebSocketManager {
  constructor(url, roomId = null) {
    this.url = url;
    this.socket = null;
    this.intervalId = null;
    this.roomId = roomId;
  }

  // Inicia la conexión con Socket.io
  conectar() {
    this.socket = io(this.url, {
      transports: ["websocket"],
      reconnection: true,
    });

    this.socket.on("connect", () => {
      console.log("Conexión establecida a Socket.io");
      if (this.roomId) {
        this.joinRoom(this.roomId);
      }
    });

    this.socket.on("message", (data) => {
      console.log("Mensaje recibido:", data);
    });

    this.socket.on("disconnect", () => {
      console.log("Socket.io desconectado");
    });

    this.socket.on("connect_error", (error) => {
      console.error("Error en la conexión Socket.io:", error);
    });
  }

  // Une el socket a una sala (room)
  joinRoom(roomId) {
    if (this.socket && this.socket.connected) {
      this.socket.emit("joinRoom", roomId);
      console.log(`Unido a la sala: ${roomId}`);
      this.roomId = roomId;
    } else {
      // Si aún no está conectado, se guarda el roomId para unirlo una vez conectado
      this.roomId = roomId;
    }
  }

  // Verifica la conexión
  testConexion() {
    return this.socket && this.socket.connected;
  }

  // Envía un mensaje a través del room actual
  enviarRegistro(data) {
    if (this.testConexion() && this.roomId) {
      this.socket.emit("enviarMensajeARoom", { roomId: this.roomId, mensaje: data.mensaje });
    } else {
      console.error("No hay conexión activa o no se ha definido un roomId para enviar datos");
    }
  }

  // Cierra la conexión
  cerrarConexion() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  // Inicia el envío periódico cada 30 segundos
  iniciarEnvioPeriodo() {
    this.enviarMensajeConFecha();
    this.intervalId = setInterval(() => {
      this.enviarMensajeConFecha();
    }, 30000);
  }

  // Detiene el envío periódico
  detenerEnvioPeriodo() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("Envío periódico detenido");
    }
  }

  // Envía un mensaje que incluye fecha y hora actual
  enviarMensajeConFecha() {
    const ahora = new Date();
    const mensaje = cifrarString(`hola desde socket con ${ahora.toLocaleDateString()} y ${ahora.toLocaleTimeString()}`);
    this.enviarRegistro({ mensaje });
    console.log("Enviando mensaje:", mensaje);
  }
}

export default WebSocketManager;
