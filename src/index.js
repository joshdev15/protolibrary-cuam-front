import React from "react";
import ReactDOM from "react-dom/client";
import Router from "pages/index";
import FirebaseProvider from "context/FirebaseContext";
import "styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <Router />
    </FirebaseProvider>
  </React.StrictMode>
);
