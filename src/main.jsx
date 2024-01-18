import React from "react";
import ReactDOM from "react-dom/client";
import { getFirestore } from "firebase/firestore";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const db = getFirestore();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
