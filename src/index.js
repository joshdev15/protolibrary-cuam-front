import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./pages/index";
import RequestProvider from "./context/RequestContext";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "./styles/global.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RequestProvider db={db}>
      <Router />
    </RequestProvider>
  </React.StrictMode>
);
