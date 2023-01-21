import { useEffect, useContext } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import { useNavigate } from "react-router-dom";
import HeaderWrapper from "components/HeaderWrapper";
import Header from "components/Header";
import Wrapper from "components/Wrapper";
import UserRolesSection from "components/UserRolesSection";

const UploadFile = () => {
  const { user } = useContext(FirebaseContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <HeaderWrapper>
        <Header title={"Roles de Usuario"} withSearchBar={false} />
      </HeaderWrapper>
      <Wrapper>
        <UserRolesSection />
      </Wrapper>
    </>
  );
};

export default UploadFile;
