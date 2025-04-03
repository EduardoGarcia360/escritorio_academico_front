import EstadoCuentaPrincipal from "views/admin/EstadoCuenta/EstadoCuentaPrincipal.js";
import EstadoCuentaAdmin from "views/admin/EstadoCuentaAdmin/EstadoCuentaAdmin";

export const rutasReportes = [
  {
    key: 1,
    path: "/admin/EstadoCuenta/EstadoCuentaPrincipal",
    name: "Estado Cuenta",
    icon: "fa-solid fa-star",
    roles: ["P"],
    hideInSidebar: false,
    order: 1,
    component: EstadoCuentaPrincipal,
  },
  {
    key: 2,
    path: "/admin/EstadoCuentaAdmin/EstadoCuentaPrincipalAdmin",
    name: "Estado Cuenta",
    icon: "fa-solid fa-star",
    roles: ["A"],
    hideInSidebar: false,
    order: 1,
    component: EstadoCuentaAdmin,
  },
];
