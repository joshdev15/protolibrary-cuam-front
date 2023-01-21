import styles from "./styles.module.scss";

const Wrapper = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.subcontainer}>{children}</div>
  </div>
);

export default Wrapper;
