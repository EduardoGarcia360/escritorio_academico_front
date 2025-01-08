import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
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

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
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
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
