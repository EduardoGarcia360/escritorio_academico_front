// /src/services/websocketManager.js

export default class WebSocketManager {
    constructor(url) {
      this.url = url;
      this.socket = null;
      this.intervalId = null;
    }
  
    // Inicia la conexión WebSocket
    conectar() {
      this.socket = new WebSocket(this.url);
      this.socket.onopen = () => {
        console.log('Conexión establecida');
      };
      this.socket.onmessage = (event) => {
        console.log('Mensaje recibido:', event.data);
      };
      this.socket.onerror = (error) => {
        console.error('Error en el WebSocket:', error);
      };
      this.socket.onclose = () => {
        console.log('Conexión cerrada');
        if (this.intervalId) clearInterval(this.intervalId);
      };
    }
  
    // Verifica si la conexión está activa
    testConexion() {
      return this.socket && this.socket.readyState === WebSocket.OPEN;
    }
  
    // Envía un registro/mensaje
    enviarRegistro(data) {
      if (this.testConexion()) {
        this.socket.send(JSON.stringify(data));
      } else {
        console.error('No hay conexión activa para enviar datos');
      }
    }
  
    // Cierra la conexión WebSocket
    cerrarConexion() {
      if (this.socket) {
        this.socket.close();
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
  
    // Método auxiliar para enviar el mensaje con fecha y hora actual
    enviarMensajeConFecha() {
      const ahora = new Date();
      const mensaje = `hola desde socket con ${ahora.toLocaleDateString()} y ${ahora.toLocaleTimeString()}`;
      this.enviarRegistro({ mensaje });
      console.log('Enviando mensaje:', mensaje);
    }
  
    // Detiene el envío periódico sin cerrar la conexión
    detenerEnvioPeriodo() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        console.log('Envio periódico detenido');
      }
    }
  }
  