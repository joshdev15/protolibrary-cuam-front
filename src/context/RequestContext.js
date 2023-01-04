import { createContext, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

export const RequestContext = createContext();

const RequestProvider = ({ children, db }) => {
  // Declarations
  const [categories, setCategories] = useState([]);

  // Methods
  const getCategories = async () => {
    const results = [];
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    categoriesSnapshot.forEach((doc) => results.push(doc.data()));
    setCategories(results);
  };

  // Render
  return (
    <RequestContext.Provider value={{ getCategories, categories }}>
      {children}
    </RequestContext.Provider>
  );
};

export default RequestProvider;
