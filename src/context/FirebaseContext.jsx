import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// import { v4 as uuid } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export const FirebaseContext = createContext();

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

const FirebaseProvider = ({ children }) => {
  // Declarations
  const [user, setUser] = useState();
  const [isLogin, setLogin] = useState(false);
  const [categories, setCategories] = useState([]);
  const [documents, setDocuments] = useState([]);

  // Methods
  const login = () => {
    console.log("login");
  };

  const anonymousLogin = async () => {
    try {
      console.log("Anonymous Login");
      const { user } = await signInAnonymously(auth);
      if (user?.uid) {
        setUser(user);
        setLogin(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // const getFileName = () => {
  // const files = ["gs://protolibrary-cuam.appspot.com/Himno-del-CUAM.mp3"];

  // files.forEach((item) => {
  // getDownloadURL(ref(storage, item))
  // .then((res) => {
  // console.log(res);
  // })
  // .catch((err) => {
  // console.log(err);
  // });
  // });
  // };

  const getCategories = async () => {
    try {
      if (user === undefined) {
        throw new Error("Your aren't authenticated");
      }

      const results = [];
      const categoriesSnapshot = await getDocs(collection(db, "categories"));
      categoriesSnapshot.forEach((doc) => results.push(doc.data()));
      setCategories(results);
    } catch (e) {
      console.error(e);
    }
  };

  const firstLoad = async () => {
    try {
      if (user === undefined) {
        throw new Error("Your aren't authenticated");
      }

      const results = [];
      const firstLoadItems = await getDocs(collection(db, "firstLoad"));
      firstLoadItems.forEach((doc) => results.push(doc.data()));
      setDocuments(results);
    } catch (e) {
      console.error(e);
    }
  };

  // Render
  return (
    <FirebaseContext.Provider
      value={{
        user,
        isLogin,
        login,
        anonymousLogin,
        categories,
        getCategories,
        // getFileName,
        firstLoad,
        documents,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
