import { useEffect, useContext } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import HeaderWrapper from "components/HeaderWrapper";
import Header from "components/Header";
import CategoryBar from "components/CategoryBar";
import SearchResult from "components/SearchResult";

const Home = () => {
  const { anonymousLogin } = useContext(FirebaseContext);

  useEffect(() => {
    anonymousLogin();
  }, []);

  return (
    <>
      <HeaderWrapper>
        <Header />
        <CategoryBar />
      </HeaderWrapper>

      <SearchResult />
    </>
  );
};

export default Home;
