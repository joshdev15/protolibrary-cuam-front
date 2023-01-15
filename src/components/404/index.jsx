import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const Comp404 = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>404</h1>
      <h2>Ups, aqui no hay nada</h2>
      <h3>
        pero puedes volver al{" "}
        <strong onClick={() => navigate("/")}>Inicio</strong>
      </h3>
    </div>
  );
};

export default Comp404;
