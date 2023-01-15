export const getRoleName = (value) => {
  if (value === undefined) {
    return "";
  }

  const roleNames = {
    student: "Alumno",
    admin: "Administrador",
    archivist: "Archivista",
  };
  return roleNames[value];
};
