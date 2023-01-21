import { useEffect, useContext } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import { useNavigate } from "react-router-dom";
import Header from "components/Header";
import HeaderWrapper from "components/HeaderWrapper";
import Wrapper from "components/Wrapper";
import LoginSection from "components/LoginSection";

const UserResgistration = () => {
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
        <Header title={"Registro de nuevo usuario"} withSearchBar={false} />
      </HeaderWrapper>
      <Wrapper>
        <LoginSection mode={"signup"} />
      </Wrapper>
    </>
  );
};

export default UserResgistration;
