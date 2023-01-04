import React from "react";
import styles from "./styles.module.scss";

const Header = () => {
  const title = "Protolibrary";
  return (
    <div className={styles.header}>
      <div>Login</div>
      <div>{title}</div>
      <div>Publico</div>
    </div>
  );
};

export default Header;
