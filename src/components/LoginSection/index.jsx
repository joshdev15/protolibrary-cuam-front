import { useState, useContext } from "react";
import { FirebaseContext } from "context/FirebaseContext";
// import GButton from "assets/gbutton.svg";
import styles from "./styles.module.scss";

const LoginSection = () => {
  const { login, signUp } = useContext(FirebaseContext);
  const [mode, setMode] = useState("login");
  const [mail, setMail] = useState();
  const [pass, setPass] = useState();

  const submit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      login(mail, pass);
    } else {
      signUp(mail, pass);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.selector}>
        <div
          className={mode === "login" ? styles.active : styles.inactive}
          onClick={() => setMode("login")}
        >
          Inicio
        </div>
        <div
          className={mode === "signup" ? styles.active : styles.inactive}
          onClick={() => setMode("signup")}
        >
          Registro
        </div>
      </div>

      <form className={styles.form} onSubmit={submit}>
        <input
          type="text"
          className={styles.input}
          placeholder="Correo"
          onChange={(e) => setMail(e.target.value)}
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Contraseña"
          onChange={(e) => setPass(e.target.value)}
        />
        <input
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

export default LoginSection;
