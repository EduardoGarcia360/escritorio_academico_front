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

export default function CoordenadasBusPrincipal() {
  const [hasMounted, setHasMounted] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const history = useHistory();
  const socketUrl = process.env.REACT_APP_SOCKET_URL;
  const [socket, setSocket] = useState(null);
  const [registroActividad, setRegistroActividad] = useState({ estado: "F" });
  const [conexionEstablecida, setConexionEstablecida] = useState(false);
  const [codigoSala, setCodigoSala] = useState(null);
  const { idCiclo, idJornadaCiclo, idGrado, idAsignacion, idTransporte } =
    useParams();

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

  useEffect(() => {
    const newSocket = io(socketUrl, {
      transports: ["websocket"],
      path: "/socket.io/",
      reconnection: true,
      upgrade: false,
    });

    newSocket.on("connect", () => {
      console.log("Conexión establecida a Socket.io en Seguimiento");
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
        console.log("Mensaje recibido en Seguimiento:", data, typeof data);
        const decodeData = descifrarString(data);
        console.log('decodeData', decodeData);

        if (decodeData) {
          const dataParse = JSON.parse(decodeData);
          console.log('dataParse', dataParse);

          // const logPagina = `${dataParse.texto} ${dataParse.location}`;

          // handleSave(dataParse.location);
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

  const fetchCoordinates = async () => {
    try {
      const response = await api.get(
        `coordenadasbus/transporte/${idTransporte}`
      );
      console.log("ubis", response);
      if (response.data.length === 0) {
        setCoordinates([]);
      } else {
        const tmp = response.data.map((location) => ({
          ...location,
          lat: location.latitud,
          lng: location.longitud,
        }));
        // console.log("tmp", tmp);
        setCoordinates(tmp);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

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
      setRegistroActividad(actividad);
      setCodigoSala(
        `ACTIVIDAD-${actividad.id_asignacion_transporte}-${actividad.id_asignacion}-${actividad.id_bus}-${actividad.id_docente}`
      );
      setHasMounted(true);
    };

    consultarRegistro();
    fetchCoordinates();
  }, [idCiclo, idJornadaCiclo, idGrado, idAsignacion, idTransporte, history]);

  if (!hasMounted) {
    return null; // Esperar hasta que los datos estén disponibles
  }

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

  const initialCoordinates =
    coordinates.length === 0 ? undefined : coordinates[0];
  //   console.log('initialCoordinates', initialCoordinates)
  const finalCoordinates =
    coordinates.length === 0 ? undefined : coordinates[coordinates.length - 1];
  //   console.log('finalCoordinates', finalCoordinates)
  const intermediateCoordinates =
    coordinates.length === 0 ? [] : coordinates.slice(1, -1);
  //   console.log('intermediateCoordinates', intermediateCoordinates)

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <MapContainer
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
        </MapContainer>
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
