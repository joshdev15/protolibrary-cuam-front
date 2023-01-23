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
  signOut,
} from "firebase/auth";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { NotificationManager } from "react-notifications";
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
  const [isAnonymous, setAnonymous] = useState();
  const [isLogin, setLogin] = useState(false);
  const [categories, setCategories] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [wRequests, setWRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [privateF, setPrivate] = useState([]);
  const [privateDocs, setPrivDocuments] = useState([]);

  // Methods
  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user?.uid) {
        localStorage.setItem("token", user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLogin(true);
          setUser(docSnap.data());
          setAnonymous(false);
          notificate("success", "Ha iniciado sesión", "Inicio completo");
        }
      }
    } catch (e) {
      notificate("error", "Error al iniciar sesión", "No se pudo iniciar");
      console.error(e);
    }
  };

  const signUp = async (email, password) => {
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
        notificate("success", "Usuario registrado", "Registro completo");
      }
    } catch (e) {
      notificate("error", "Error al registrar", "Verifique los datos");
      console.error(e);
    }
  };

  const verifyLogin = async () => {
    const currentUserToken = localStorage.getItem("token");
    try {
      if (currentUserToken === null) {
        throw new Error("not local user");
      }

      const docRef = doc(db, "users", currentUserToken);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLogin(true);
        setUser(docSnap.data());
        setAnonymous(false);
        notificate("success", "Ha iniciado sesión", "Inicio completo");
      }
    } catch (e) {
      anonymousLogin();
    }
  };

  const anonymousLogin = async () => {
    try {
      const { user } = await signInAnonymously(auth);
      if (user?.uid) {
        setUser();
        setLogin(true);
        setAnonymous(true);
      }
    } catch (e) {
      notificate("error", "Error de inicio anonimo", "Error en inicio");
      console.error(e);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      setLogin(true);
      setUser();
      setAnonymous(false);
      await anonymousLogin();
      firstLoad();
      notificate("info", "Sesión Cerrada");
    } catch (e) {
      notificate("error", "Error al cerrar sesión");
      console.log(e);
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
      const q = query(
        collection(db, "documents"),
        where("categoryId", "==", "cuam")
      );
      const firstLoadItems = await getDocs(q);
      firstLoadItems.forEach((doc) => results.push(doc.data()));
      setDocuments(results);
    } catch (e) {
      console.error(e);
    }
  };

  const getDocumentsByCategory = async (id) => {
    try {
      if (!isLogin) {
        throw new Error("Your aren't authenticated");
      }

      const results = [];

      const q = query(
        collection(db, "documents"),
        where("categoryId", "==", id)
      );
      const firstLoadItems = await getDocs(q);
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
    try {
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
      notificate("success", "Solicitud creada");
      return request;
    } catch (e) {
      notificate("error", "Error al cerrar sesión");
    }
  };

  const uploadFile = async (file) => {
    const storageRef = ref(storage, `doc_${uuid()}${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return snapshot;
  };

  const getWaitingRequest = async () => {
    try {
      const results = [];
      const q = query(
        collection(db, "requests"),
        where("status", "==", "waiting")
      );

      const requestsSnapshot = await getDocs(q);
      requestsSnapshot.forEach((doc) => results.push(doc.data()));
      notificate("success", "Lista actualizada");
      setWRequests(results);
    } catch (e) {
      notificate("error", "Error al obtener la lista");
    }
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
          notificate("success", "Solicitud aprobada");
          getWaitingRequest();
        }
      });
    } catch (err) {
      notificate("error", "Error en la aprobación de la solicitud");
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
        const objectRef = ref(storage, data.fileRef);
        await deleteObject(objectRef);
        await deleteDoc(doc(db, "documents", data.id));
        firstLoad();
        notificate("success", "Documento eliminado");
      });
    } catch (err) {
      notificate("error", "Error en la eliminacion del documento");
      console.error(err);
    }
  };

  const searchFiles = async (value) => {
    try {
      if (!isLogin) {
        throw new Error("Your aren't authenticated");
      }

      const results = [];
      const files = await getDocs(collection(db, "documents"));
      files.forEach((doc) => {
        const data = doc.data();

        if (data.name.toLowerCase().includes(value.toLowerCase())) {
          results.push(doc.data());
        }
      });

      if (results.length === 0) {
        notificate("info", "No se encontro ningún documento");
      }

      setDocuments(results);
    } catch (e) {
      console.error(e);
    }
  };

  const getUserByEmail = async (value) => {
    try {
      if (!isLogin) {
        throw new Error("Your aren't authenticated");
      }

      const results = [];
      const q = query(collection(db, "users"), where("email", "==", value));
      const users = await getDocs(q);
      users.forEach((doc) => results.push(doc.data()));
      if (results?.length === 0) {
        notificate("warn", "Usuario no encontrado");
      }

      setUsers(results);
    } catch (e) {
      notificate("error", "Error al buscar el usuario");
      console.error(e);
    }
  };

  const updateRole = async (uid, value) => {
    try {
      if (!isLogin) {
        throw new Error("Your aren't authenticated");
      }

      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        role: value,
      });
      notificate("success", "Rol actualizado");
    } catch (e) {
      notificate("error", "Error al buscar el usuario");
      console.error(e);
    }
  };

  const addCategory = async (name) => {
    const categoryNames = categories.map((cat) => cat.name.toLowerCase());
    try {
      if (categoryNames.includes(name)) {
        throw new Error("La categoria ya existe");
      }

      if (["", " ", false].includes(name)) {
        throw new Error("El nombre no puede estar vacío");
      }

      if (name.length < 3) {
        throw new Error("El nombre debe tener mas de 3 caracteres");
      }

      await addDoc(collection(db, "categories"), {
        name,
        id: uuid(),
        inerasable: false,
      });
      notificate("success", "Categoría agregada");
      getCategories();
    } catch (e) {
      notificate("error", e.message);
    }
  };

  const getPrivateFiles = async () => {
    try {
      if (!isLogin && isAnonymous == true) {
        throw new Error("Your aren't authenticated");
      }

      const q = query(
        collection(db, "privatefiles"),
        where("userEmail", "==", user?.email)
      );
      const results = [];
      const privateFiles = await getDocs(q);
      privateFiles.forEach((doc) => results.push(doc.data()));
      setPrivate(results);
    } catch (e) {
      console.error(e);
    }
  };

  const setPrivateFiles = async (file, name) => {
    try {
      if ([undefined, false, ""].includes(file)) {
        throw new Error("Archivo Invalido");
      }

      const fileData = await uploadFile(file);
      const fileRef = await getFileName(fileData.metadata.fullPath);
      addDoc(collection(db, "privatefiles"), {
        type: "private",
        userEmail: user?.email,
        name: `${user?.email}-${name}`,
        url: fileRef.url,
        ref: fileRef.ref,
        is: name,
        keyId: uuid(),
        roles: ["any", "student", "archivist", "admin"],
        owner: user.email,
        author: user.email,
        year: `${new Date().getFullYear()}`,
      });

      getPrivateFiles();
      notificate("success", "Documento cargado");
    } catch (err) {
      notificate("error", "Error en la carga de documento personal");
      console.error(err);
    }
  };

  const searchPrivateFiles = async (value) => {
    try {
      if (!isLogin) {
        throw new Error("Your aren't authenticated");
      }

      const results = [];
      const files = await getDocs(collection(db, "privatefiles"));
      files.forEach((doc) => {
        const data = doc.data();

        if (data.name.toLowerCase().includes(value.toLowerCase())) {
          results.push(doc.data());
        }
      });

      if (results.length === 0) {
        notificate("info", "No se encontro ningún documento");
      }

      setPrivDocuments(results);
    } catch (e) {
      console.error(e);
    }
  };

  const deletePrivFileAndDocument = async (id) => {
    try {
      const q = query(collection(db, "privatefiles"), where("keyId", "==", id));
      const request = await getDocs(q);
      const results = [];
      request.forEach((doc) => results.push({ ...doc.data(), id: doc.id }));
      results.forEach(async (data) => {
        const objectRef = ref(storage, data.ref);
        console.log(objectRef);
        await deleteObject(objectRef);
        await deleteDoc(doc(db, "privatefiles", data.id));
        setPrivDocuments([]);
        notificate("success", "Documento eliminado");
      });
    } catch (err) {
      notificate("error", "Error en la eliminacion del documento");
      console.error(err);
    }
  };

  const notificate = (type, title, msg) => {
    switch (type) {
      case "info":
        NotificationManager.info(msg, title);
        break;
      case "success":
        NotificationManager.success(msg, title);
        break;
      case "warning":
        NotificationManager.warning(msg, title);
        break;
      case "error":
        NotificationManager.error(msg, title);
        break;
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
        getDocumentsByCategory,
        verifyLogin,
        logout,
        searchFiles,
        users,
        getUserByEmail,
        updateRole,
        addCategory,
        getPrivateFiles,
        setPrivateFiles,
        privateF,
        searchPrivateFiles,
        privateDocs,
        deletePrivFileAndDocument,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
