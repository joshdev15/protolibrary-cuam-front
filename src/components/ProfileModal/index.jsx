import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "context/FirebaseContext";
import { getRoleName } from "utils/functions";
import styles from "./styles.module.scss";

const links = [
  {
    key: "home",
    name: "Ir al Inicio",
    route: "/",
    roles: ["student", "archivist", "admin"],
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

const ProfileModal = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(FirebaseContext);
  const goToRoute = (value) => navigate(value);

  return (
    <div className={styles.profile}>
      <div className={styles.left}>
        <div className={styles.role}>{getRoleName(user?.role)}</div>
        <div className={styles.name}>{user.name}</div>
        <div className={styles.email}>{user.email}</div>

        <div className={styles.actionCont}>
          <h3 className={styles.actionTitle}>Acciones</h3>

          {links.map(
            ({ route, name, key, roles }) =>
              roles.includes(user.role) && (
                <p
                  onClick={() => goToRoute(route)}
                  className={styles.link}
                  key={key}
                >
                  {name}
                </p>
              )
          )}
        </div>

        <strong className={styles.signout} onClick={logout}>
          Cerrar Sesión
        </strong>
      </div>
    </div>
  );
};

export default ProfileModal;
