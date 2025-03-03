import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useHistory, useParams } from "react-router-dom";
import { api } from "services/api";
import goalIconUrl from "assets/img/goal.png";
import busIconUrl from "assets/img/bus.png";
import noLocationsIconUrl from "assets/img/no_locations.png";
import { io } from "socket.io-client";
import { descifrarString } from 'services/codificar.js';
let contador = 0; // Inicializa un contador

export default function CoordenadasBusPrincipal() {
  const [hasMounted, setHasMounted] = useState(false);
  const [renderPage, setRenderPage] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [initialCoordinates, setInitialCoordinates] = useState(null);
  const [finalCoordinates, setFinalCoordinates] = useState(null);
  const [intermediateCoordinates, setIntermediateCoordinates] = useState(null);
  const history = useHistory();
  const socketUrl = process.env.REACT_APP_SOCKET_URL;
  const [socket, setSocket] = useState(null);
  const [conexionEstablecida, setConexionEstablecida] = useState(false);
  const [codigoSala, setCodigoSala] = useState(null);
  const { idCiclo, idJornadaCiclo, idGrado, idAsignacion, idTransporte } =
    useParams();
  const limite = 4; // Define el número máximo de ejecuciones
  const arregloTemporal = [
    { latitude: 14.623164, longitude: -91.593123 },
    { latitude: 14.627570, longitude: -91.589371 },
    { latitude: 14.631976, longitude: -91.585619 },
    { latitude: 14.636382, longitude: -91.581867 },
  ]
  const arregloTemporal2 = [
    { latitude: 14.640788, longitude: -91.578115 },
    { latitude: 14.645194, longitude: -91.574363 },
    { latitude: 14.649600, longitude: -91.570611 },
    { latitude: 14.654006, longitude: -91.566859 },
  ]

  // Crear íconos personalizados
  const goalIcon = new L.Icon({
    iconUrl: goalIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const busIcon = new L.Icon({
    iconUrl: busIconUrl,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const noLocationsIcon = new L.Icon({
    iconUrl: noLocationsIconUrl,
    iconSize: [48, 48],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const pointIcon = new L.divIcon({
    html: '<div style="width: 10px; height: 10px; background-color: black; border-radius: 50%;"></div>',
    className: "",
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  });

  const simulacionEnvioUbicacion2 = () => {
    contador = 0

    const intervalo = setInterval(() => {
      asignarNuevaCoordenada(arregloTemporal2[contador])
      contador++; // Incrementa el contador cada segundo

      if (contador === limite) {
        clearInterval(intervalo);
      }
    }, 10000);
  }

  const simulacionEnvioUbicacion = () => {
    contador = 0

    const intervalo = setInterval(() => {
      asignarNuevaCoordenada(arregloTemporal[contador])
      contador++; // Incrementa el contador cada segundo

      if (contador === limite) {
        clearInterval(intervalo);
        simulacionEnvioUbicacion2()
      }
    }, 10000);
  }

  const asignarNuevaCoordenada = (location) => {
    console.log('ASIGNAR', location)
    let ubisTmp = coordinates;
    ubisTmp.push({ lat: location.latitude, lng: location.longitude })
    setCoordinates(ubisTmp);
    definirCoordenadas(ubisTmp);
  };

  const joinRoom = (roomId) => {
    if (socket && socket.connected) {
      socket.emit("joinRoom", roomId);
      // setCurrentRoom(roomId);
      console.log(`Unido a la sala ${roomId}`);
      // Limpiamos los mensajes al cambiar de room
      // setMessages([]);
    } else {
      console.error("Socket no está conectado");
    }
  };

  const definirCoordenadas = (coordinates) => {
    const initCoordinates = coordinates.length === 0 ? undefined : coordinates[0];
    // console.log('initCoordinates', initCoordinates)
    setInitialCoordinates(initCoordinates)

    const finCoordinates = coordinates.length === 0 ? undefined : coordinates[coordinates.length - 1];
    // console.log('finCoordinates', finCoordinates)
    setFinalCoordinates(finCoordinates)

    const interteCoordinates = coordinates.length === 0 ? [] : coordinates.slice(1, -1);
    // console.log('interteCoordinates', interteCoordinates)
    setIntermediateCoordinates(interteCoordinates)

    setRenderPage(true)
  };

  useEffect(() => {
    const newSocket = io(socketUrl, {
      transports: ["websocket"],
      path: "/socket.io/",
      reconnection: true,
      upgrade: false,
    });

    newSocket.on("connect", () => {
      console.log("Conexión establecida a Socket.io");
      setConexionEstablecida(true);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Error en conexión:", error);
    });

    newSocket.on("reconnect_attempt", (attempt) => {
      console.log("Intento de reconexión:", attempt);
    });

    newSocket.on("message", (data) => {
      if (data) {
        console.log(`Mensaje recibido de WebSocket: ${typeof data}`);
        try {
          const decodeData = descifrarString(data);
          // console.log('decodeData', decodeData);

          if (decodeData) {
            const dataParse = JSON.parse(decodeData);
            console.log('dataParse', dataParse);
            asignarNuevaCoordenada(JSON.parse(dataParse.location));
          }
        } catch (error) {
          console.error('error parse', error.message)
        }
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [socketUrl]);

  useEffect(() => {
    if (hasMounted && codigoSala && conexionEstablecida) {
      joinRoom(codigoSala);
    }
  }, [hasMounted, codigoSala, conexionEstablecida]);

  useEffect(() => {
    if (
      !idCiclo ||
      !idJornadaCiclo ||
      !idGrado ||
      !idAsignacion ||
      !idTransporte
    ) {
      history.push("/admin/CicloEscolar/CicloEscolarPrincipal");
      return;
    }

    const consultarRegistro = async () => {
      const response = await api.get(
        `asignacionestransporteextra/${idTransporte}`
      );
      console.log("registro", response);
      const actividad = response.data;
      // setRegistroActividad(actividad);
      setCodigoSala(
        `ACTIVIDAD-${actividad.id_asignacion_transporte}-${actividad.id_asignacion}-${actividad.id_bus}-${actividad.id_docente}`
      );
      setHasMounted(true);
    };

    const fetchCoordinates = async () => {
      try {
        const response = await api.get(
          `coordenadasbus/transporte/${idTransporte}`
        );
        console.log("ubis", response);
        if (response.data.length === 0) {
          setCoordinates([]);
          definirCoordenadas([]);
        } else {
          const tmp = response.data.map((location) => ({
            ...location,
            lat: location.latitud,
            lng: location.longitud,
          }));
          // console.log("tmp", tmp);
          setCoordinates(tmp);
          definirCoordenadas(tmp);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    consultarRegistro();
    fetchCoordinates();
  }, [idCiclo, idJornadaCiclo, idGrado, idAsignacion, idTransporte, history]);

  // useEffect(() => {
  //   if (renderPage) {
  //     simulacionEnvioUbicacion();
  //   }
  // }, [renderPage]);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        {
          renderPage === true && (<MapContainer
            id="contenedorMapaLeaflet"
            center={
              !finalCoordinates
                ? { lat: 14.641871637588684, lng: -90.5130113026698 }
                : finalCoordinates
            }
            zoom={13}
            style={{ height: "900px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
  
            {/* Marcador inicial */}
            {initialCoordinates && (
              <Marker
                position={[initialCoordinates.lat, initialCoordinates.lng]}
                icon={goalIcon}
              >
                <Popup>Hola soy el inicio</Popup>
              </Marker>
            )}
  
            {/* Marcador final */}
            {finalCoordinates && (
              <Marker
                position={[finalCoordinates.lat, finalCoordinates.lng]}
                icon={busIcon}
              >
                <Popup>Hola soy final</Popup>
              </Marker>
            )}
  
            {/* Marcador sin ubicaciones */}
            {!initialCoordinates && !finalCoordinates && (
              <Marker
                position={[14.641871637588684, -90.5130113026698]}
                icon={noLocationsIcon}
              >
                <Popup>No hay ubicaciones disponibles</Popup>
              </Marker>
            )}
  
            {/* Marcadores intermedios */}
            {intermediateCoordinates.length > 0 &&
              intermediateCoordinates.map((coord, index) => (
                <Marker
                  key={index}
                  position={[coord.lat, coord.lng]}
                  icon={pointIcon}
                />
              ))}
          </MapContainer>)
        }
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="bg-red-700 text-white font-medium py-2 px-4 rounded-md hover:bg-red-800"
          onClick={() =>
            history.push(
              `/admin/AsignarBus/AsignarBusPrincipal/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}/actividad/${idAsignacion}/transporte/`
            )
          }
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
