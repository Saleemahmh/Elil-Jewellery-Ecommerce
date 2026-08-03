import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";


import "@fontsource/cinzel";
import "@fontsource/manrope";

import "./index.css";
import App from "./App.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
  
      <BrowserRouter>
        <App />
      </BrowserRouter>
  
  </StrictMode>
);