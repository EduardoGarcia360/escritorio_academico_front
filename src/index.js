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
import NivelEducacionPrincipal from "views/admin/NivelEducacion/NivelEducacionPrincipal.js";
import NivelEducacionGestionar from "views/admin/NivelEducacion/NivelEducacionGestionar.js";
import CicloEscolarPrincipal from "views/admin/CicloEscolar/CicloEscolarPrincipal.js";
import CicloEscolarGestionar from "views/admin/CicloEscolar/CicloEscolarGestionar.js";
import JornadaPrincipal from "views/admin/Jornada/JornadaPrincipal.js";
import JornadaGestionar from "views/admin/Jornada/JornadaGestionar.js";
import CicloJornadaPrincipal from "views/admin/CicloEscolarJornada/CicloEscolarJornadaPrincipal.js";
import CicloJornadaGestionar from "views/admin/CicloEscolarJornada/CicloEscolarJornadaGestionar.js";
import GradoPrincipal from "views/admin/Grado/GradoPrincipal.js";
import GradoGestionar from "views/admin/Grado/GradoGestionar.js";
import AsignarEstudiantePrincipal from "views/admin/AsignarEstudiante/AsignarEstudiantePrincipal.js";
import AsignarEstudianteGestionar from "views/admin/AsignarEstudiante/AsignarEstudianteGestionar.js";
import PersonalDocentePrincipal from "views/admin/PersonalDocente/PersonalDocentePrincipal.js";
import PersonalDocenteGestionar from "views/admin/PersonalDocente/PersonalDocenteGestionar.js";
import AsignarMaestroPrincipal from "views/admin/AsignarMaestro/AsignarMaestroPrincipal.js";
import AsignarMaestroGestionar from "views/admin/AsignarMaestro/AsignarMaestroGestionar.js";
import CuotaColegioPrincipal from "views/admin/CuotaColegio/CuotaColegioPrincipal.js";
import CuotaColegioGestionar from "views/admin/CuotaColegio/CuotaColegioGestionar.js";

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
      <Route path="/admin/NivelEducacion/NivelEducacionPrincipal" exact component={NivelEducacionPrincipal} />
      <Route path="/admin/NivelEducacion/NivelEducacionGestionar/:id?" exact component={NivelEducacionGestionar} />
      <Route path="/admin/CicloEscolar/CicloEscolarPrincipal" exact component={CicloEscolarPrincipal} />
      <Route path="/admin/CicloEscolar/CicloEscolarGestionar/:id?" exact component={CicloEscolarGestionar} />
      <Route path="/admin/Jornada/JornadaPrincipal/:id" exact component={JornadaPrincipal} />
      <Route path="/admin/Jornada/JornadaGestionar/:id/jornada/:idJornada?" exact component={JornadaGestionar} />
      <Route path="/admin/CicloEscolarJornada/CicloEscolarJornadaPrincipal/:id" exact component={CicloJornadaPrincipal} />
      <Route path="/admin/CicloEscolarJornada/CicloEscolarJornadaGestionar/:id" exact component={CicloJornadaGestionar} />
      <Route path="/admin/Grado/GradoPrincipal/:idCiclo/jornada/:idJornadaCiclo" exact component={GradoPrincipal} />
      <Route path="/admin/Grado/GradoGestionar/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado?" exact component={GradoGestionar} />
      <Route path="/admin/AsignarEstudiante/AsignarEstudiantePrincipal/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado" exact component={AsignarEstudiantePrincipal} />
      <Route path="/admin/AsignarEstudiante/AsignarEstudianteGestionar/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado" exact component={AsignarEstudianteGestionar} />
      <Route path="/admin/PersonalDocente/PersonalDocentePrincipal" exact component={PersonalDocentePrincipal} />
      <Route path="/admin/PersonalDocente/PersonalDocenteGestionar/:id?" exact component={PersonalDocenteGestionar} />
      <Route path="/admin/AsignarMaestro/AsignarMaestroPrincipal/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado" exact component={AsignarMaestroPrincipal} />
      <Route path="/admin/AsignarMaestro/AsignarMaestroGestionar/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado" exact component={AsignarMaestroGestionar} />
      <Route path="/admin/CuotaColegio/CuotaColegioPrincipal" exact component={CuotaColegioPrincipal} />
      <Route path="/admin/CuotaColegio/CuotaColegioGestionar/:id?" exact component={CuotaColegioGestionar} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
