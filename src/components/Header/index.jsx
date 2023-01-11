import { useState } from "react";
import Modal from "components/Modal";
import LoginSection from "components/LoginSection";
import styles from "./styles.module.scss";

const Header = () => {
  const [active, setActive] = useState(false);
  const closeModal = () => setActive(false);

  return (
    <>
      <Modal isActive={active} title={"Inicio | Registro"} onClose={closeModal}>
        <LoginSection />
      </Modal>

      <div className={styles.header}>
        <div>Publico</div>
        <div>Protobibloteca</div>
        <div onClick={() => setActive(true)}>Inicio | Registro</div>
      </div>
    </>
  );
};

export default Header;
