import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginProvider from "./Features/Login/Context/Login/LoginProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import App from "./Navigation/Routes/Routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1. Creas el cliente (el cerebro de la caché)
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 2. Envuelves la app para que cualquier componente pueda usarlo */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LoginProvider>
          <App />
        </LoginProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
