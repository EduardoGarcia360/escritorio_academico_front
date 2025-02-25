// /src/services/websocketManager.js
import { io } from "socket.io-client";

class WebSocketManager {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.intervalId = null;
  }

  // Inicia la conexión con Socket.io
  conectar() {
    this.socket = io(this.url, {
      transports: ["websocket"],
      reconnection: true,
    });

    this.socket.on("connect", () => {
      console.log("Conexión establecida a Socket.io");
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

  // Verifica si la conexión está activa
  testConexion() {
    return this.socket && this.socket.connected;
  }

  // Envía un mensaje mediante Socket.io
  enviarRegistro(data) {
    if (this.testConexion()) {
      this.socket.emit("message", data);
    } else {
      console.error("No hay conexión activa para enviar datos");
    }
  }

  // Cierra la conexión Socket.io
  cerrarConexion() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  // Inicia el envío periódico cada 30 segundos
  iniciarEnvioPeriodo() {
    // Envío inmediato del primer mensaje (opcional)
    this.enviarMensajeConFecha();
    this.intervalId = setInterval(() => {
      this.enviarMensajeConFecha();
    }, 30000);
  }

  // Detiene el envío periódico sin cerrar la conexión
  detenerEnvioPeriodo() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("Envío periódico detenido");
    }
  }

  // Envía un mensaje que incluye fecha y hora
  enviarMensajeConFecha() {
    const ahora = new Date();
    const mensaje = `hola desde socket con ${ahora.toLocaleDateString()} y ${ahora.toLocaleTimeString()}`;
    this.enviarRegistro({ mensaje });
    console.log("Enviando mensaje:", mensaje);
  }
}

export default WebSocketManager;
