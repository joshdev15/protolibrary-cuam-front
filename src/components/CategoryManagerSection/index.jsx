import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import { Input } from "components/FormComponents";
import styles from "./styles.module.scss";

const CategoryManagerSection = () => {
  const [categoryValue, setCatValue] = useState();
  const { categories, getCategories, addCategory } =
    useContext(FirebaseContext);

  const setNewCategory = (e) => {
    e.preventDefault();
    addCategory(categoryValue);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <form className={styles.catInputContainer} onSubmit={setNewCategory}>
        <Input
          onChange={(e) => setCatValue(e.target.value)}
          label={"Nombre de nueva categoria"}
          placeholder={"Nueva Categoría"}
        />
      </form>

      {categories.map(({ name, id }) => (
        <div className={styles.categoryLine}>
          <p>{name}</p>
          <strong>Id: {id}</strong>
        </div>
      ))}
    </div>
  );
};

export default CategoryManagerSection;
