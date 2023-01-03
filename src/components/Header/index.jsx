import React from "react";
import styles from "./styles.module.scss";

const Header = () => {
  const title = "Header Component!";
  return <div className={styles.header}>{title}</div>;
};

export default Header;
