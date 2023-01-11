import { useContext, useEffect } from "react";
import { FirebaseContext } from "../../context/FirebaseContext";
import styles from "./styles.module.scss";

const CategoryBar = () => {
  const { isLogin, getCategories, categories } = useContext(FirebaseContext);

  useEffect(() => {
    if (isLogin) getCategories();
    // eslint-disable-next-line
  }, [isLogin]);

  return (
    categories.length > 0 && (
      <div className={styles.bar}>
        {categories.map(({ name, id }) => (
          <div className={styles.item} key={id}>
            {name}
          </div>
        ))}
      </div>
    )
  );
};

export default CategoryBar;
