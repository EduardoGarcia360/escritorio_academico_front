// /src/services/websocketManager.js
import { io } from "socket.io-client";
import { cifrarString } from "./codificar.js";
// import { registerPlugin } from '@capacitor/core'

// const backGeolocation = registerPlugin('BackgroundGeolocation');
const backGeolocation = null;

class WebSocketManager {
  constructor(url, roomId = null) {
    this.url = url;
    this.socket = null;
    this.intervalId = null;
    this.roomId = roomId;
    this.idBackGeolocation = null;
  }

  // Inicia la conexión con Socket.io
  conectar() {
    this.socket = io(this.url, {
      transports: ["websocket"],
      path: "/socket.io/",
      reconnection: true,
      upgrade: false,
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
    console.log('_____ CERRAR ID PARA EL BACKGROUND', this.idBackGeolocation)
    if (this.idBackGeolocation) {
      backGeolocation.removeWatcher({ id: this.idBackGeolocation });
    }
  }

  // Inicia el envío periódico cada 30 segundos
  iniciarEnvioPeriodo() {
    this.iniciarBackGeolocation();
  }

  // Detiene el envío periódico
  detenerEnvioPeriodo() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("Envío periódico detenido");
    }
    console.log('_____ CERRAR ID PARA EL BACKGROUND', this.idBackGeolocation)
    if (this.idBackGeolocation) {
      backGeolocation.removeWatcher({ id: this.idBackGeolocation });
    }
  }

  // Envía un mensaje que incluye fecha y hora actual
  enviarMensajeConFecha(locationResult) {
    const ahora = new Date();
    const mensaje = cifrarString(`socket ${ahora.toLocaleDateString()} y ${ahora.toLocaleTimeString()}: ${locationResult}`);
    this.enviarRegistro({ mensaje });
    console.log("Enviando mensaje:", mensaje);
  }

  async iniciarBackGeolocation() {
    console.log('***** iniciarBackGeolocation *****')
    const idWatchLocation = await backGeolocation.addWatcher(
      {
        interval: 30000, //El intervalo en el que se comprueba la localización.
        backgroundMessage: "Obteniendo ubicación...",
        backgroundTitle: "Seguimiento Activo",
        requestPermissions: true,
        stale: false,
      },
      async (location) => {
        if (location !== null) {
          const ahora = new Date();
          console.log(`obteniendo la ubicación ${ahora.toLocaleDateString()} y ${ahora.toLocaleTimeString()}`);
          const cleanLocation = { latitude: location.latitude, longitude: location.longitude, simulated: location.simulated }
          console.log('CLEAN', JSON.stringify(cleanLocation));
          const locationResult = JSON.stringify(location);
          console.log('ubicación', locationResult)
          this.enviarMensajeConFecha(locationResult);
        }
      }
    ).then((watcher_id) =>  {
      console.log('_____ ID PARA EL BACKGROUND', watcher_id)
      this.idBackGeolocation = watcher_id
    })
  }
}

export default WebSocketManager;
