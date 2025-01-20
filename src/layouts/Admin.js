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
import CuotaEstudiantePrincipal from "views/admin/CuotaEstudiante/CuotaEstudiantePrincipal.js";
import BancoPrincipal from "views/admin/Banco/BancoPrincipal.js";
import BancoGestionar from "views/admin/Banco/BancoGestionar.js";
import CuentaBancariaPrincipal from "views/admin/CuentaBancaria/CuentaBancariaPrincipal.js";
import CuentaBancariaGestionar from "views/admin/CuentaBancaria/CuentaBancariaGestionar.js";
import PagoCuotaGestionar from "views/admin/PagoCuota/PagoCuotaGestionar.js";
import GastoExtraPrincipal from "views/admin/GastoExtra/GastoExtraPrincipal.js";
import GastoExtraGestionar from "views/admin/GastoExtra/GastoExtraGestionar.js";
import AsignarActividadPrincipal from "views/admin/AsignarActividad/AsignarActividadPrincipal.js";
import AsignarActividadGestionar from "views/admin/AsignarActividad/AsignarActividadGestionar.js";
import BusPrincipal from "views/admin/Bus/BusPrincipal.js";
import BusGestionar from "views/admin/Bus/BusGestionar.js";
import AsignarBusPrincipal from "views/admin/AsignarBus/AsignarBusPrincipal.js";
import AsignarBusGestionar from "views/admin/AsignarBus/AsignarBusGestionar.js";
import CoordenadasBusPrincipal from "views/admin/CoordenadasBus/CoordenadasBusPrincipal.js";
import UsuarioPrincipal from "views/admin/Usuario/UsuarioPrincipal.js";
import UsuarioGestionar from "views/admin/Usuario/UsuarioGestionar.js";

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
            <Route 
              path="/admin/CuotaEstudiante/CuotaEstudiantePrincipal/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado/estudiante/:idEstudiante" 
              exact 
              component={CuotaEstudiantePrincipal} 
            />
            <Route 
              path="/admin/PagoCuota/PagoCuotaGestionar/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado/estudiante/:idEstudiante/cuota/:idCuota" 
              exact 
              component={PagoCuotaGestionar} 
            />
            <Route path="/admin/Banco/BancoPrincipal" exact component={BancoPrincipal} />
            <Route path="/admin/Banco/BancoGestionar/:id?" exact component={BancoGestionar} />
            <Route path="/admin/CuentaBancaria/CuentaBancariaPrincipal" exact component={CuentaBancariaPrincipal} />
            <Route path="/admin/CuentaBancaria/CuentaBancariaGestionar/:id?" exact component={CuentaBancariaGestionar} />
            <Route path="/admin/GastoExtra/GastoExtraPrincipal" exact component={GastoExtraPrincipal} />
            <Route path="/admin/GastoExtra/GastoExtraGestionar/:id?" exact component={GastoExtraGestionar} />
            <Route 
              path="/admin/AsignarActividad/AsignarActividadPrincipal/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado" 
              exact 
              component={AsignarActividadPrincipal} 
            />
            <Route 
              path="/admin/AsignarActividad/AsignarActividadGestionar/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado" 
              exact 
              component={AsignarActividadGestionar} 
            />
            <Route path="/admin/Bus/BusPrincipal" exact component={BusPrincipal} />
            <Route path="/admin/Bus/BusGestionar/:id?" exact component={BusGestionar} />
            <Route 
              path="/admin/AsignarBus/AsignarBusPrincipal/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado/actividad/:idAsignacion/transporte/" 
              exact 
              component={AsignarBusPrincipal} 
            />
            <Route 
              path="/admin/AsignarBus/AsignarBusGestionar/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado/actividad/:idAsignacion/transporte/:idTransporte?" 
              exact 
              component={AsignarBusGestionar} 
            />
            <Route 
              path="/admin/CoordenadasBus/CoordenadasBusPrincipal/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado/actividad/:idAsignacion/transporte/:idTransporte" 
              exact 
              component={CoordenadasBusPrincipal} 
            />
            <Route path="/admin/Usuario/UsuarioPrincipal" exact component={UsuarioPrincipal} />
            <Route path="/admin/Usuario/UsuarioGestionar/:id?" exact component={UsuarioGestionar} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
