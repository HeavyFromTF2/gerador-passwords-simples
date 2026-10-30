// Ponto de entrada: liga o React à página.
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

// Procura o <div id="root"> do index.html e desenha lá o componente <App />
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
