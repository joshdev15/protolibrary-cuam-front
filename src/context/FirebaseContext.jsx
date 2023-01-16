import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  doc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
  query,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { v4 as uuid } from "uuid";

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
  const [wRequests, setWRequests] = useState([]);

  // Methods
  const login = async (email, password) => {
    console.log("Login");
    try {
      await setPersistence(auth, browserLocalPersistence);
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
      const { user } = await signInAnonymously(auth);
      if (user?.uid) {
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

  const getFileName = async (filename) => {
    try {
      const url = await getDownloadURL(
        ref(storage, `gs://${process.env.REACT_APP_STORAGE_BUCKET}/${filename}`)
      );
      return {
        ref: `gs://${process.env.REACT_APP_STORAGE_BUCKET}/${filename}`,
        url,
      };
    } catch (e) {
      console.error(e);
    }
  };

  const createNewRequest = async (data) => {
    const requestId = `req_${uuid()}`;
    const requestData = {
      requestId,
      user: user.uid,
      userEmail: user.email,
      documentObject: {
        ...data,
        keyId: uuid(),
        roles: ["any", "student", "archivist", "admin"],
        owner: user.email,
      },
      status: "waiting",
    };

    const request = await setDoc(doc(db, "requests", requestId), requestData);
    return request;
  };

  const uploadFile = async (file) => {
    const storageRef = ref(storage, `doc_${uuid()}${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return snapshot;
  };

  const getWaitingRequest = async () => {
    const results = [];
    const q = query(
      collection(db, "requests"),
      where("status", "==", "waiting")
    );

    const requestsSnapshot = await getDocs(q);
    requestsSnapshot.forEach((doc) => results.push(doc.data()));
    setWRequests(results);
  };

  const approveRequest = async (id) => {
    try {
      const reqRef = doc(db, "requests", id);
      updateDoc(reqRef, {
        status: "approved",
      });

      const q = query(collection(db, "requests"), where("requestId", "==", id));
      const request = await getDocs(q);
      const results = [];
      request.forEach((doc) => results.push(doc.data()));
      results.forEach(async (data) => {
        const docRef = await addDoc(
          collection(db, "documents"),
          data.documentObject
        );

        if (docRef.id) {
          console.log("Success", docRef.id);
          getWaitingRequest();
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFileAndDocument = async (id) => {
    try {
      const q = query(collection(db, "documents"), where("keyId", "==", id));
      const request = await getDocs(q);
      const results = [];
      request.forEach((doc) => results.push({ ...doc.data(), id: doc.id }));
      results.forEach(async (data) => {
        console.log(data);
        const objectRef = ref(storage, data.fileRef);
        const isDeleted = await deleteObject(objectRef);
        console.log(isDeleted);

        const docRef = await deleteDoc(doc(db, "documents", data.id));
        console.log(docRef);
      });
    } catch (err) {
      console.error(err);
    }
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
        uploadFile,
        createNewRequest,
        wRequests,
        getWaitingRequest,
        approveRequest,
        deleteFileAndDocument,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
