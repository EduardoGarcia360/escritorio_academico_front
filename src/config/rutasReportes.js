import EstadoCuentaPrincipal from "views/admin/EstadoCuenta/EstadoCuentaPrincipal.js";

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
];
