import { useState } from "react";
import GButton from "assets/gbutton.svg";
import styles from "./styles.module.scss";

const LoginSection = () => {
  const [mode, setMode] = useState("login");
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

      <form className={styles.form}>
        <input type="text" className={styles.input} placeholder="Correo" />
        <input type="text" className={styles.input} placeholder="Contraseña" />
        <input
          type="submit"
          className={styles.input}
          value={mode === "login" ? "Iniciar" : "Registrarse"}
        />

        <button type="submit" className={styles.google}>
          <img src={GButton} alt={"google button"} width={20} height={20} />
          {`${mode === "login" ? "Iniciar" : "Registrarse"} con Google`}
        </button>
      </form>
    </div>
  );
};

export default LoginSection;
