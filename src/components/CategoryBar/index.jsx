import { useContext, useEffect } from "react";
import { RequestContext } from "../../context/RequestContext";
import styles from "./styles.module.scss";

const CategoryBar = () => {
  const { getCategories, categories } = useContext(RequestContext);

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

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
