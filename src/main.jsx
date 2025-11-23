// src/main.jsx (FINAL Y CORREGIDO)

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
     <BrowserRouter>

      {/* 🚨 SOLO RENDERIZAMOS APP.JSX (que ya contiene todos los Providers) */}
      <App />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </BrowserRouter>

    </StrictMode>
);
