import styles from "./styles.module.scss";

const HeaderWrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default HeaderWrapper;
