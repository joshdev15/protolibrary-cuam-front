import { useContext } from "react";
import { FirebaseContext } from "../../context/FirebaseContext";
import BookCard from "../BookCard";
import styles from "./styles.module.scss";

const SearchResult = () => {
  const { documents } = useContext(FirebaseContext);

  return (
    <div className={styles.result}>
      <div className={styles.subcontainer}>
        {documents.map((item) => (
          <BookCard key={item.keyId} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
