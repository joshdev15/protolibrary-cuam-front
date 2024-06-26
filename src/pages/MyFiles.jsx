import { useContext, useEffect } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import HeaderWrapper from "components/HeaderWrapper";
import Header from "components/Header";
import Wrapper from "components/Wrapper";
import MyFilesSection from "components/MyFilesSection";
import { useNavigate } from "react-router-dom";

const MyFiles = () => {
  const navigate = useNavigate();
  const { user } = useContext(FirebaseContext);

  useEffect(() => {
    if (!["student"].includes(user?.role)) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <HeaderWrapper>
        <Header title={"Mis Documentos"} withSearchBar={false} />
      </HeaderWrapper>
      <Wrapper>
        <MyFilesSection />
      </Wrapper>
    </>
  );
};

export default MyFiles;
