import BookCard from "../BookCard";
import styles from "./styles.module.scss";

const SearchResult = () => {
  const array = Array.from({ length: 100 }, () => Math.random() * 10000);

  return (
    <div className={styles.result}>
      <div className={styles.subcontainer}>
        {array.map((index) => (
          <BookCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
