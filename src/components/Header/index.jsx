import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { FirebaseContext } from "context/FirebaseContext";
import Modal from "components/Modal";
import LoginSection from "components/LoginSection";
import ProfileModal from "components/ProfileModal";
import SearchBar from "components/SearchBar";
import { getRoleName } from "utils/functions";
import styles from "./styles.module.scss";

const Header = ({ title, withSearchBar }) => {
  const { user } = useContext(FirebaseContext);
  const [loginSt, setLoginSt] = useState(false);
  const [profileSt, setProfileSt] = useState(false);
  const closeModal = () => {
    setLoginSt(false);
    setProfileSt(false);
  };

  useEffect(() => {
    if (user !== undefined) {
      setLoginSt(false);
    }
  }, [user]);

  return (
    <>
      {user === undefined ? (
        <Modal
          isActive={loginSt}
          title={"Inicio de Sesion"}
          onClose={closeModal}
        >
          <LoginSection mode={"login"} />
        </Modal>
      ) : (
        <Modal isActive={profileSt} title={"Perfil"} onClose={closeModal}>
          <ProfileModal />
        </Modal>
      )}

      <div className={styles.header}>
        <div className={styles.leftContainer}>
          <div className={styles.titleZone}>
            <span className={styles.title}>{title}</span>

            {user === undefined ? (
              <div onClick={() => setLoginSt(true)} className={styles.label}>
                Inicio de Sesion
              </div>
            ) : (
              <div onClick={() => setProfileSt(true)} className={styles.label}>
                {getRoleName(user?.role)}
              </div>
            )}
          </div>
          {withSearchBar ? (
            <div className={styles.search}>
              <SearchBar />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  withSearchBar: PropTypes.bool,
};

Header.defaultProps = {
  title: "Protobiblioteca",
  withSearchBar: true,
};

export default Header;
