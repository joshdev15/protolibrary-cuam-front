import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import Modal from "components/Modal";
import LoginSection from "components/LoginSection";
import SearchBar from "components/SearchBar";
import styles from "./styles.module.scss";

const Header = () => {
  const { user } = useContext(FirebaseContext);
  const [active, setActive] = useState(false);
  const closeModal = () => setActive(false);

  useEffect(() => {
    if (user !== undefined) {
      setActive(false);
    }
  }, [user]);

  const getRoleName = (value) => {
    const roleNames = {
      student: "Alumno",
      admin: "Administrador",
      archivist: "Archivista",
    };
    return roleNames[value];
  };

  return (
    <>
      <Modal isActive={active} title={"Inicio | Registro"} onClose={closeModal}>
        <LoginSection />
      </Modal>

      <div className={styles.header}>
        <div className={styles.leftContainer}>
          <div className={styles.titleZone}>
            <span className={styles.title}>Protobiblioteca</span>

            {user === undefined ? (
              <div onClick={() => setActive(true)} className={styles.label}>
                Inicio | Registro
              </div>
            ) : (
              <div className={styles.label}>{getRoleName(user?.role)}</div>
            )}
          </div>
          <SearchBar />
        </div>
      </div>
    </>
  );
};

export default Header;
