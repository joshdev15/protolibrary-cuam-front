import { useContext } from "react";
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
    key: "upload",
    name: "Subir un nuevo documento",
    route: "/upload-file",
    roles: ["student", "archivist"],
  },
  {
    key: "requests",
    name: "Ver solicitudes de nuevo documentos",
    route: "/requests",
    roles: ["archivist", "admin"],
  },
  {
    key: "users",
    name: "Promocion de usuario",
    route: "/user-roles",
    roles: ["admin"],
  },
];

const ProfileModal = () => {
  const { user } = useContext(FirebaseContext);
  const navigate = useNavigate();
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
      </div>

      <div className={styles.right}>
        <div>Aun no ha realizado ninguna acción</div>
      </div>
    </div>
  );
};

export default ProfileModal;
