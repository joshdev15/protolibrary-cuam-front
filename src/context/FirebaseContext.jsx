import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
// import { getStorage } from "firebase/storage";

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
// const storage = getStorage(app);

const FirebaseProvider = ({ children }) => {
  // Declarations
  const [user, setUser] = useState();
  const [isLogin, setLogin] = useState(false);
  const [categories, setCategories] = useState([]);

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

  // Methods
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
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
