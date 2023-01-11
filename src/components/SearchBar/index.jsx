import React from "react";
import styles from "./styles.module.scss";

const SearchBar = () => {
  return (
    <div className={styles.searchbar}>
      <input className={styles.field} placeholder={"Realiza tu busqueda..."} />
    </div>
  );
};

export default SearchBar;
