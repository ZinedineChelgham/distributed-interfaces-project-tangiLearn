import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TUIOManager } from "@dj256/tuiomanager";

const root = ReactDOM.createRoot(document.getElementById("root"));
const tuioManager = new TUIOManager();
tuioManager.start();
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
