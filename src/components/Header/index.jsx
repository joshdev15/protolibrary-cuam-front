import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import Modal from "components/Modal";
import LoginSection from "components/LoginSection";
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
        <div>Protobiblioteca</div>
        {user === undefined ? (
          <div onClick={() => setActive(true)}>Inicio | Registro</div>
        ) : (
          <div>{getRoleName(user?.role)}</div>
        )}
      </div>
    </>
  );
};

export default Header;
