import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "./App.tsx";
import { PokedexProvider } from "./contexts/PokedexContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PokedexProvider>
        <App />
      </PokedexProvider>
    </BrowserRouter>
  </StrictMode>,
);
