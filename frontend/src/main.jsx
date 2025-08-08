import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import './styles/index.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/Hidden-Object-Game/">
      <App />
    </BrowserRouter>
  </StrictMode>
);
