import React from "react";
import { Route, Redirect } from "react-router-dom";
import { rolePermissionsReport } from "./rolePermissionsReport.js";
import { getCookie } from "services/cookie.js";
import { descifrarObjeto } from "services/codificar.js";

// Componente de ruta protegida
const PrivateRouteReport = ({ component: Component, path, ...rest }) => {
  const userProperties = getCookie('userProperties');
  const descifrado = descifrarObjeto(userProperties);
  const userRole = descifrado.role; // Obtener rol del usuario

  return (
    <Route
      {...rest}
      render={(props) =>
        rolePermissionsReport[userRole]?.includes(path) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/security/Unauthorized" />
        )
      }
    />
  );
};

export default PrivateRouteReport;
