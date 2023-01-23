import { useContext, useEffect } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import HeaderWrapper from "components/HeaderWrapper";
import Header from "components/Header";
import Wrapper from "components/Wrapper";
import SearchPrivate from "components/SearchPrivate";
import PrivateResult from "components/PrivateResults";
import { useNavigate } from "react-router-dom";

const StudentsFiles = () => {
  const navigate = useNavigate();
  const { user } = useContext(FirebaseContext);

  useEffect(() => {
    if (!["archivist", "admin"].includes(user?.role)) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <HeaderWrapper>
        <Header title={"Documentos de Alumnos"} withSearchBar={false} />
      </HeaderWrapper>
      <Wrapper>
        <SearchPrivate />
        <PrivateResult />
      </Wrapper>
    </>
  );
};

export default StudentsFiles;
