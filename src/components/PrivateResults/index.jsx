import { useContext } from "react";
import { FirebaseContext } from "../../context/FirebaseContext";
import BookCard from "../BookCard";
import styles from "./styles.module.scss";

const PrivateResult = () => {
  const { privateDocs } = useContext(FirebaseContext);
  return (
    <div className={styles.result}>
      <div className={styles.subcontainer}>
        {privateDocs.map((item) => (
          <BookCard key={item.keyId} item={item} privated />
        ))}
      </div>
    </div>
  );
};

export default PrivateResult;
