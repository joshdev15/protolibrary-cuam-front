import { useContext, useEffect } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import CategoryManagerSection from "components/CategoryManagerSection";
import HeaderWrapper from "components/HeaderWrapper";
import Header from "components/Header";
import Wrapper from "components/Wrapper";
import { useNavigate } from "react-router-dom";

const CategoryManager = () => {
  const navigate = useNavigate();
  const { user, getCategories } = useContext(FirebaseContext);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (!["archivist", "admin"].includes(user?.role)) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <HeaderWrapper>
        <Header title={"Gestión de Categorías"} withSearchBar={false} />
      </HeaderWrapper>
      <Wrapper>
        <CategoryManagerSection />
      </Wrapper>
    </>
  );
};

export default CategoryManager;
