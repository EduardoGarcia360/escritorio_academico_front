import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import "assets/styles/leaflet.css"

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import { rutas } from "config/rutas.js";
import PrivateRoute from "config/PrivateRoute.js";
import { rutasReportes } from "config/rutasReportes.js";
import PrivateRouteReport from "config/PrivateRouteReport.js";
import Unauthorized from "views/security/Unauthorized.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/landing" exact component={Landing} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact component={Index} />
      <Route path="/security/Unauthorized" exact component={Unauthorized} />
      {rutas.map(({ key, path, component }) => (
        <PrivateRoute key={key} path={path} exact component={component} />
      ))}
      {rutasReportes.map(({ key, path, component }) => (
        <PrivateRouteReport key={key} path={path} exact component={component} />
      ))}
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
