import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { FirebaseContext } from "context/FirebaseContext";
// import GButton from "assets/gbutton.svg";
import { Input } from "components/FormComponents";
import styles from "./styles.module.scss";

const LoginSection = ({ mode }) => {
  const { login, signUp } = useContext(FirebaseContext);
  const [mail, setMail] = useState();
  const [pass, setPass] = useState();

  const submit = (e) => {
    e.preventDefault();
    if (mode === undefined) {
      return;
    }

    if (mode === "login") {
      login(mail, pass);
      return;
    }

    if (mode === "signup") {
      signUp(mail, pass);
      return;
    }
  };

  return (
    <div className={styles.login}>
      <form className={styles.form} onSubmit={submit}>
        <Input
          type="text"
          label={"Correo"}
          placeholder="Correo"
          onChange={(e) => setMail(e.target.value)}
        />
        <Input
          type="password"
          label={"Contraseña"}
          placeholder="Contraseña"
          onChange={(e) => setPass(e.target.value)}
        />
        <Input
          type="submit"
          className={styles.input}
          value={mode === "login" ? "Iniciar" : "Registrarse"}
        />

        {/*
        <button type="submit" className={styles.google}>
          <img src={GButton} alt={"google button"} width={20} height={20} />
          {`${mode === "login" ? "Iniciar" : "Registrarse"} con Google`}
        </button>
        */}
      </form>
    </div>
  );
};

LoginSection.propTypes = {
  mode: PropTypes.string,
};

export default LoginSection;
