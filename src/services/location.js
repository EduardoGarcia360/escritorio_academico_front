// import { Geolocation } from '@capacitor/geolocation';

const Geolocation = null;

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    const requestPermissions = async () => {
      console.log('requestPermissions inicio___')
      try {
        const permissions = await Geolocation.requestPermissions();
        console.log(
          "requestPermissions",
          permissions,
          JSON.stringify(permissions)
        );
        if (permissions.location === "granted") {
          console.log(
            "requestPermissions currentPosition",
            permissions.location
          );
          return true;
        } else {
          console.log("Location access permission denied.");
          return false;
        }
      } catch (error) {
        console.log("ERROR REQUEST PERMISSIONS", error.message);
        return false;
      }
    };

    const checkLocationPermissions = async () => {
      console.log('checkLocationPermissions inicio____')
      try {
        const result = await Geolocation.checkPermissions();
        console.log("checkLocationPermissions", result, JSON.stringify(result));
        if (result.location === "granted") {
          // console.log('Location access granted.')
          return true;
        } else if (result.location === "denied") {
          // console.log('Location access permission denied.')
          return false;
        } else if (result.location === "prompt") {
          // console.log('Location access permission has not been granted yet, the user will be prompted.');
          return await requestPermissions();
        } else if (result.location === "prompt-with-rationale") {
          // console.log('Location access permission unknown.')
          return await requestPermissions();
        }
      } catch (error) {
        console.log("ERROR CHECK LOCATION", error.message);
        return false;
      }
    };

    const locationFetch = async () => {
      const gpsPermissions = await checkLocationPermissions();

      if (gpsPermissions) {
        const opciones = {
          enableHighAccuracy: true, // Habilita la alta precisión
          timeout: 1000, // El tiempo de espera máximo en milisegundos para las actualizaciones de ubicación.
          maximumAge: 0, // No aceptar una ubicación en caché y obtener una nueva
        };
        try {
          const position = await Geolocation.getCurrentPosition(opciones);
          console.log("locationFetch", JSON.stringify(position));
          const { latitude, longitude } = position.coords;
          // redondeo a 8 porque son los decimales que aceptan los campos en la tabla
          resolve({
            status: "OK",
            latitude: Number(latitude.toFixed(8)),
            longitude: Number(longitude.toFixed(8)),
          });
        } catch (error) {
          console.log("Catch locationFetch", error);
          resolve({
            status: "ERROR",
            message:
              "Existe un problema al obtener la ubicación, por favor verifique",
          });
        }
      } else {
        console.log('Location access permission denied.____')
        resolve({
          status: "ERROR",
          message:
            "Existe un problema con los permisos de ubicación, por favor verifique",
        });
      }
    };

    locationFetch();
  });
};
