import React from "react";
import ReactDOM from "react-dom/client";
import Router from "pages/Router";
import FirebaseProvider from "context/FirebaseContext";
import "react-notifications/lib/notifications.css";
import "react-tooltip/dist/react-tooltip.css";
import "styles/global.css";
import { NotificationContainer } from "react-notifications";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <Router />
      <NotificationContainer />
    </FirebaseProvider>
  </React.StrictMode>
);
