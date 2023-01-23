import { useEffect, useContext } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import { useNavigate } from "react-router-dom";
import HeaderWrapper from "components/HeaderWrapper";
import Header from "components/Header";
import UploadForm from "components/UploadForm";

const UploadFile = () => {
  const { user, getCategories } = useContext(FirebaseContext);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (user === undefined) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <HeaderWrapper>
        <Header title={"Subir Documento"} withSearchBar={false} />
      </HeaderWrapper>
      <UploadForm />
    </>
  );
};

export default UploadFile;
