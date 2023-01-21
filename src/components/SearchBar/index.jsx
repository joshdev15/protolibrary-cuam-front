import { useContext, useState } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import styles from "./styles.module.scss";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const { searchFiles } = useContext(FirebaseContext);
  const performSearch = (e) => {
    e.preventDefault();
    searchFiles(value);
  };

  return (
    <form
      className={styles.searchbar}
      onSubmit={(e) => performSearch(e)}
      href="#"
    >
      <input
        className={styles.field}
        placeholder={"Realiza tu busqueda..."}
        onChange={(e) => setValue(e.target.value)}
      />
      <input type="submit" style={{ display: "none" }} />
    </form>
  );
};

export default SearchBar;
