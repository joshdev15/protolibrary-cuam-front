export const links = [
  {
    key: "home",
    name: "Ir al Inicio",
    route: "/",
    roles: ["student", "archivist", "admin"],
  },
  {
    key: "my-files",
    name: "Mis Documentos",
    route: "/myfiles",
    roles: ["student"],
  },
  {
    key: "users-registration",
    name: "Registro de usuario",
    route: "/user-registration",
    roles: ["archivist", "admin"],
  },
  {
    key: "users-roles",
    name: "Gestión de Roles de Usuario",
    route: "/user-roles",
    roles: ["admin"],
  },
  {
    key: "upload",
    name: "Subir un nuevo documento",
    route: "/upload-file",
    roles: ["student", "archivist", "admin"],
  },
  {
    key: "requests",
    name: "Solicitudes de nuevos documentos",
    route: "/requests",
    roles: ["archivist", "admin"],
  },
  {
    key: "categories",
    name: "Creación de nueva categoría",
    route: "/categories",
    roles: ["archivist", "admin"],
  },
];
