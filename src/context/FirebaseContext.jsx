import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  doc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  // addDoc,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
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
  const [isAnonymous, setAnonymous] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [categories, setCategories] = useState([]);
  const [documents, setDocuments] = useState([]);

  // Methods
  const login = async (email, password) => {
    console.log("Login");
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user?.uid) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
          setAnonymous(false);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const signUp = async (email, password) => {
    console.log("Register");
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = response;
      if (user?.uid && !user?.isAnonymous) {
        const appUser = {
          uid: user.uid,
          isAnonymous: user?.isAnonymous,
          role: "student",
          email: email,
        };

        await setDoc(doc(db, "users", user.uid), appUser);
        // console.log(resp);
        login(email, password);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const anonymousLogin = async () => {
    try {
      console.log("Anonymous Login");
      const { user } = await signInAnonymously(auth);
      if (user?.uid) {
        // setUser(user);
        setLogin(true);
        setAnonymous(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getCategories = async () => {
    try {
      if (!isLogin) {
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
      if (!isLogin) {
        throw new Error("Your aren't authenticated");
      }

      const results = [];
      const firstLoadItems = await getDocs(collection(db, "documents"));
      firstLoadItems.forEach((doc) => results.push(doc.data()));
      setDocuments(results);
    } catch (e) {
      console.error(e);
    }
  };

  const getFileName = () => {
    const files = ["gs://protolibrary-cuam.appspot.com/Documento Prueba-1.pdf"];
    files.forEach((item) => {
      getDownloadURL(ref(storage, item))
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  // Render
  return (
    <FirebaseContext.Provider
      value={{
        user,
        isAnonymous,
        isLogin,
        login,
        signUp,
        anonymousLogin,
        categories,
        getCategories,
        getFileName,
        firstLoad,
        documents,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
