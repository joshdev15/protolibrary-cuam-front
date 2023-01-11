import EmptyImage from "assets/empty.png";
import styles from "./styles.module.scss";

const BookCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.image}>
          <img src={EmptyImage} alt={"Document"} />
        </div>
        <h1>Nombre</h1>
        <h2>Autores</h2>
        <h3>Año</h3>
      </div>
    </div>
  );
};

export default BookCard;
