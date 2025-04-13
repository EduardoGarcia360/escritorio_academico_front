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
import IniciarWS from "views/admin/TestWebSocket/TestWebSocketPrincipal.js";
import SeguimientoWS from "views/admin/TestWebSocket/TestWebSocketSeguimiento.js";
import RegistroHorarioBusPrincipal from "views/admin/RegistroHorarioBus/RegistroHorarioBusPrincipal.js";
import RegistroHorarioBusGestionar from "views/admin/RegistroHorarioBus/RegistroHorarioBusGestionar.js";

export const rutas = [
  {
    key: 1,
    path: "/admin/ColegioGestion",
    name: "Colegio",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: false,
    order: 2,
    component: ColegioGestion,
  },
  {
    key: 2,
    path: "/admin/EstudiantePrincipal",
    name: "Estudiante",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: false,
    order: 3,
    component: EstudiantePrincipal,
  },
  {
    key: 3,
    path: "/admin/Estudiante/EstudianteGestionar/:id?",
    name: "EstudianteGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: EstudianteGestionar,
  },
  {
    key: 4,
    path: "/admin/Tutores/TutorPrincipal/:id",
    name: "Tutor",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: TutorPrincipal,
  },
  {
    key: 5,
    path: "/admin/Tutores/TutorGestionar/:id/tutor/:idTutor?",
    name: "TutorGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: TutorGestionar,
  },
  {
    key: 6,
    path: "/admin/NivelEducacion/NivelEducacionPrincipal",
    name: "Nivel Educación",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: false,
    order: 10,
    component: NivelEducacionPrincipal,
  },
  {
    key: 7,
    path: "/admin/NivelEducacion/NivelEducacionGestionar/:id?",
    name: "NivelEducacionGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: NivelEducacionGestionar,
  },
  {
    key: 8,
    path: "/admin/CicloEscolar/CicloEscolarPrincipal",
    name: "Ciclo Escolar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: false,
    order: 11,
    component: CicloEscolarPrincipal,
  },
  {
    key: 9,
    path: "/admin/CicloEscolar/CicloEscolarGestionar/:id?",
    name: "CicloEscolarGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: CicloEscolarGestionar,
  },
  {
    key: 10,
    path: "/admin/Jornada/JornadaPrincipal/:id",
    name: "Jornada",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: JornadaPrincipal,
  },
  {
    key: 11,
    path: "/admin/Jornada/JornadaGestionar/:id/jornada/:idJornada?",
    name: "JornadaGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: JornadaGestionar,
  },
  {
    key: 12,
    path: "/admin/CicloEscolarJornada/CicloEscolarJornadaPrincipal/:id",
    name: "Ciclo Escolar Jornada",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: CicloJornadaPrincipal,
  },
  {
    key: 13,
    path: "/admin/CicloEscolarJornada/CicloEscolarJornadaGestionar/:id",
    name: "CicloEscolarJornadaGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: CicloJornadaGestionar,
  },
  {
    key: 14,
    path: "/admin/Grado/GradoPrincipal/:idCiclo/jornada/:idJornadaCiclo",
    name: "Grado",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: GradoPrincipal,
  },
  {
    key: 15,
    path: "/admin/Grado/GradoGestionar/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado?",
    name: "GradoGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: GradoGestionar,
  },
  {
    key: 16,
    path: "/admin/AsignarEstudiante/AsignarEstudiantePrincipal/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado",
    name: "Asignar Estudiante",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: AsignarEstudiantePrincipal,
  },
  {
    key: 17,
    path: "/admin/AsignarEstudiante/AsignarEstudianteGestionar/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado",
    name: "AsignarEstudianteGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: AsignarEstudianteGestionar,
  },
  {
    key: 18,
    path: "/admin/PersonalDocente/PersonalDocentePrincipal",
    name: "Personal Docente",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: false,
    order: 4,
    component: PersonalDocentePrincipal,
  },
  {
    key: 19,
    path: "/admin/PersonalDocente/PersonalDocenteGestionar/:id?",
    name: "PersonalDocenteGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: PersonalDocenteGestionar,
  },
  {
    key: 20,
    path: "/admin/AsignarMaestro/AsignarMaestroPrincipal/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado",
    name: "Asignar Maestro",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: AsignarMaestroPrincipal,
  },
  {
    key: 21,
    path: "/admin/AsignarMaestro/AsignarMaestroGestionar/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado",
    name: "AsignarMaestroGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: AsignarMaestroGestionar,
  },
  {
    key: 22,
    path: "/admin/CuotaColegio/CuotaColegioPrincipal",
    name: "Cuota Colegio",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: false,
    order: 5,
    component: CuotaColegioPrincipal,
  },
  {
    key: 23,
    path: "/admin/CuotaColegio/CuotaColegioGestionar/:id?",
    name: "CuotaColegioGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: CuotaColegioGestionar,
  },
  {
    key: 24,
    path: "/admin/CuotaEstudiante/CuotaEstudiantePrincipal/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado/estudiante/:idEstudiante",
    name: "Cuota Estudiante",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: CuotaEstudiantePrincipal,
  },
  {
    key: 25,
    path: "/admin/PagoCuota/PagoCuotaGestionar/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado/estudiante/:idEstudiante/cuota/:idCuota",
    name: "PagoCuotaGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: PagoCuotaGestionar,
  },
  {
    key: 26,
    path: "/admin/Banco/BancoPrincipal",
    name: "Banco",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: false,
    order: 6,
    component: BancoPrincipal,
  },
  {
    key: 27,
    path: "/admin/Banco/BancoGestionar/:id?",
    name: "BancoGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: BancoGestionar,
  },
  {
    key: 28,
    path: "/admin/CuentaBancaria/CuentaBancariaPrincipal",
    name: "Cuenta Bancaria",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: false,
    order: 7,
    component: CuentaBancariaPrincipal,
  },
  {
    key: 29,
    path: "/admin/CuentaBancaria/CuentaBancariaGestionar/:id?",
    name: "CuentaBancariaGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: CuentaBancariaGestionar,
  },
  {
    key: 30,
    path: "/admin/GastoExtra/GastoExtraPrincipal",
    name: "Gasto Extra",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: false,
    order: 8,
    component: GastoExtraPrincipal,
  },
  {
    key: 31,
    path: "/admin/GastoExtra/GastoExtraGestionar/:id?",
    name: "GastoExtraGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: GastoExtraGestionar,
  },
  {
    key: 32,
    path: "/admin/AsignarActividad/AsignarActividadPrincipal/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado",
    name: "Asignar Actividad",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: AsignarActividadPrincipal,
  },
  {
    key: 33,
    path: "/admin/AsignarActividad/AsignarActividadGestionar/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado",
    name: "AsignarActividadGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: AsignarActividadGestionar,
  },
  {
    key: 34,
    path: "/admin/Bus/BusPrincipal",
    name: "Bus",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: false,
    order: 9,
    component: BusPrincipal,
  },
  {
    key: 35,
    path: "/admin/Bus/BusGestionar/:id?",
    name: "BusGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: BusGestionar,
  },
  {
    key: 36,
    path: "/admin/AsignarBus/AsignarBusPrincipal/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado/actividad/:idAsignacion/transporte/",
    name: "Asignar Bus",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: AsignarBusPrincipal,
  },
  {
    key: 37,
    path: "/admin/AsignarBus/AsignarBusGestionar/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado/actividad/:idAsignacion/transporte/:idTransporte?",
    name: "AsignarBusGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: AsignarBusGestionar,
  },
  {
    key: 38,
    path: "/admin/CoordenadasBus/CoordenadasBusPrincipal/:idCiclo/jornada/:idJornadaCiclo/grado/:idGrado/actividad/:idAsignacion/transporte/:idTransporte",
    name: "Coordenadas Bus",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: CoordenadasBusPrincipal,
  },
  {
    key: 39,
    path: "/admin/Usuario/UsuarioPrincipal",
    name: "Usuario",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: false,
    order: 1,
    component: UsuarioPrincipal,
  },
  {
    key: 40,
    path: "/admin/Usuario/UsuarioGestionar/:id?",
    name: "UsuarioGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: UsuarioGestionar,
  },
  {
    key: 41,
    path: "/admin/TestWebSocket/TestWebSocketPrincipal",
    name: "IniciarWS",
    icon: "fa-solid fa-star",
    roles: ["-"],
    hideInSidebar: true,
    component: IniciarWS,
  },
  {
    key: 42,
    path: "/admin/TestWebSocket/TestWebSocketSeguimiento",
    name: "SeguimientoWS",
    icon: "fa-solid fa-star",
    roles: ["-"],
    hideInSidebar: true,
    component: SeguimientoWS,
  },
  {
    key: 43,
    path: "/admin/RegistroHorarioBus/RegistroHorarioBusPrincipal",
    name: "Registro Horario Bus",
    icon: "fa-solid fa-star",
    roles: [process.env.REACT_APP_PLATAFORMA_ID === "2" ? "A" : "-"],
    hideInSidebar: process.env.REACT_APP_PLATAFORMA_ID === "2" ? false : true,
    component: RegistroHorarioBusPrincipal,
  },
  {
    key: 44,
    path: "/admin/RegistroHorarioBus/RegistroHorarioBusGestionar/:idAsignacionTransporte",
    name: "RegistroHorarioBusGestionar",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: true,
    component: RegistroHorarioBusGestionar,
  },
];
