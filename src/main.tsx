import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import LoginProvider from "./Features/Login/Context/Login/LoginProvider.tsx";
import App from "./Routes/Routes.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <App />
      </LoginProvider>
    </BrowserRouter>
  </StrictMode>,
);
