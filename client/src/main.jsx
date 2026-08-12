import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";
import "@fontsource/cinzel";
import "@fontsource/manrope";

import "./index.css";
import App from "./App.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
   <Provider store={store}>
      <BrowserRouter>
        <App />
         <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#4A294B",
              color: "#FFFFFF",
              border: "1px solid #C7A05A",
            },
          }}
        />
      </BrowserRouter>
  </Provider>
  </StrictMode>
);