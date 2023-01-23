import { useEffect, useContext } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import { useNavigate } from "react-router-dom";
import HeaderWrapper from "components/HeaderWrapper";
import Header from "components/Header";
import UploadList from "components/UploadList";

const UploadFile = () => {
  const { user } = useContext(FirebaseContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(["archivist", "admin"].includes(user?.role));
    if (!["archivist", "admin"].includes(user?.role)) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <HeaderWrapper>
        <Header title={"Solicitud de Nuevo Documento"} withSearchBar={false} />
      </HeaderWrapper>
      <UploadList />
    </>
  );
};

export default UploadFile;
