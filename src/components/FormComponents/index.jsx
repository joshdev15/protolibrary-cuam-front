import { useState, useContext } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export const Input = (props) => {
  const { label, setValue, keyName } = props;
  return (
    <label className={styles.label}>
      <span>{label}</span>
      <input
        className={props?.className ? props.className : styles.input}
        onChange={(e) => setValue(e.target.value, keyName)}
        {...props}
      />
    </label>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  keyName: PropTypes.string,
  setValue: PropTypes.func,
};

export const File = (props) => {
  const [fileName, setName] = useState();
  const { label, setValue, keyName } = props;
  const fileVerification = (e) => {
    if (e?.target?.files.length > 0) {
      setName(e.target.files[0].name);
      setValue(e.target.files[0], keyName);
    }
  };

  return (
    <label className={styles.fileLabel}>
      <span>{label}</span>
      <div className={styles.pseudofile}>
        <p>{fileName ? fileName : "Click para seleccionar un Documento"}</p>
        <input
          type="file"
          className={props?.className ? props.className : styles.file}
          onChange={(e) => fileVerification(e)}
          {...props}
        />
      </div>
    </label>
  );
};

File.propTypes = {
  label: PropTypes.string,
  keyName: PropTypes.string,
  setValue: PropTypes.func,
};

export const Category = (props) => {
  const { label, setValue, keyName } = props;
  const { categories } = useContext(FirebaseContext);

  return (
    <label className={styles.fileLabel}>
      <span>{label}</span>
      <select
        className={props?.className ? props.className : styles.input}
        onChange={(e) => setValue(e.target.value, keyName)}
        {...props}
      >
        <option value="">Seleccione una Categoría</option>
        {categories.map(({ id, name }) => (
          <option value={id}>{name}</option>
        ))}
      </select>
    </label>
  );
};

Category.propTypes = {
  label: PropTypes.string,
  keyName: PropTypes.string,
  setValue: PropTypes.func,
};
