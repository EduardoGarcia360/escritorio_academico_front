// /src/services/websocketManager.js
import { io } from "socket.io-client";
import { cifrarString } from "./codificar.js";
import { api } from "./api.js";
// import { registerPlugin } from '@capacitor/core'

// const backGeolocation = registerPlugin('BackgroundGeolocation');
const backGeolocation = null;

class WebSocketManager {
  constructor(url, roomId = null, tipoUbicacion = null) {
    this.url = url;
    this.socket = null;
    this.intervalId = null;
    this.roomId = roomId;
    this.idBackGeolocation = null;
    this.tipoUbicacion = tipoUbicacion;
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
  iniciarEnvioPeriodo(tipoUbicacion) {
    this.tipoUbicacion = tipoUbicacion;
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

  getIdAsignacionTransporte() {
    const partes = this.roomId.split('-')
    return partes[1]
  }

  async guardarUbicacion(location) {
    console.log('handleSave', location)
    const formData = {
      id_asignacion_transporte: this.getIdAsignacionTransporte(),
      latitud: location.latitude,
      longitud: location.longitude,
      accuracy: location.accuracy,
      altitude: location.altitude,
      altitude_accuracy: location.altitude_accuracy,
      simulated: location.simulated,
      speed: location.speed,
      bearing: location.bearing,
      time: location.time,
      tipo_ubicacion: this.tipoUbicacion,
    }
    console.log('FORM DATA', formData)
    const response = await api.post('coordenadasbus/', formData)
    console.log('INSERCION', JSON.stringify(response.data));
  }

  // Envía un mensaje que incluye fecha y hora actual
  enviarMensajeConFecha(location) {
    const ahora = new Date();
    const texto = `WebSocket: enviado el ${ahora.toLocaleDateString()} a las ${ahora.toLocaleTimeString()}`;
    const locationString = JSON.stringify(location);
    const objCifrar = JSON.stringify({ texto: texto, location: locationString })
    const mensaje = cifrarString(objCifrar);
    this.guardarUbicacion(location);
    this.enviarRegistro({ mensaje });
    console.log("Enviando mensaje:", mensaje);
  }

  async iniciarBackGeolocation() {
    console.log('***** iniciarBackGeolocation *****')
    await backGeolocation.addWatcher(
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
          console.log('ubicación', JSON.stringify(location))
          this.enviarMensajeConFecha(location);
        }
      }
    ).then((watcher_id) =>  {
      console.log('_____ ID PARA EL BACKGROUND', watcher_id)
      this.idBackGeolocation = watcher_id
    })
  }
}

export default WebSocketManager;
