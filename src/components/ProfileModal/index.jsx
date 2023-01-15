import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "context/FirebaseContext";
import { getRoleName } from "utils/functions";
import styles from "./styles.module.scss";

const links = [
  {
    name: "Ir al Inicio",
    route: "/",
  },
  {
    name: "Subir un nuevo documento",
    route: "/upload-file",
  },
  {
    name: "Ver solicitudes de nuevo documentos",
    route: "/requests",
  },
  {
    name: "Promocion de usuario",
    route: "/user-roles",
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

          {links.map(({ route, name }) => (
            <p onClick={() => goToRoute(route)} className={styles.link}>
              {name}
            </p>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <div>Aun no ha realizado ninguna acción</div>
      </div>
    </div>
  );
};

export default ProfileModal;
