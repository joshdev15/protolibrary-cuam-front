import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "context/FirebaseContext";
import { getRoleName } from "utils/functions";
import { links } from "utils/constants";
import styles from "./styles.module.scss";

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
