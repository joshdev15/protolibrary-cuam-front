import { useEffect } from "react";
import PropTypes from "prop-types";
import CloseIcon from "assets/close.png";
import styles from "./styles.module.scss";

const Modal = ({ children, isActive, title, onClose }) => {
  useEffect(() => {
    if (isActive) {
      document.querySelector("body").style = "overflow: hidden";
    } else {
      document.querySelector("body").style = "overflow: initial";
    }
  }, [isActive]);

  return (
    <>
      {isActive && (
        <div className={styles.backdrop}>
          <div className={styles.content}>
            <header className={styles.header}>
              <div className={styles.left} />
              <h1 className={styles.center}>
                {title !== undefined ? title : ""}
              </h1>
              <div className={styles.right} onClick={onClose}>
                <img src={CloseIcon} alt="Close modal" />
              </div>
            </header>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  isActive: PropTypes.bool,
};

export default Modal;
