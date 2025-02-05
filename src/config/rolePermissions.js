import { rutas } from "./rutas";

// Convertir rutas en un objeto con roles como claves
export const rolePermissions = rutas.reduce((acc, ruta) => {
  ruta.roles.forEach((rol) => {
    if (!acc[rol]) acc[rol] = [];
    acc[rol].push(ruta.path);
  });
  // console.log('roles permiso', acc);
  return acc;
}, {});
