import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";

import ColegioGestion from "views/admin/ColegioGestion.js";
import EstudiantePrincipal from "views/admin/EstudiantePrincipal.js";
import EstudianteGestionar from "views/admin/Estudiante/EstudianteGestionar.js";
import TutorPrincipal from "views/admin/Tutores/TutorPrincipal.js";
import TutorGestionar from "views/admin/Tutores/TutorGestionar.js";

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
      <Route path="/admin/ColegioGestion" exact component={ColegioGestion} />
      <Route path="/admin/EstudiantePrincipal" exact component={EstudiantePrincipal} />
      <Route path="/admin/Estudiante/EstudianteGestionar/:id?" exact component={EstudianteGestionar} />
      <Route path="/admin/Tutores/TutorPrincipal/:id" exact component={TutorPrincipal} />
      <Route path="/admin/Tutores/TutorGestionar/:id/tutor/:idTutor?" exact component={TutorGestionar} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
