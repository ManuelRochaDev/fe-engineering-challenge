import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import App from "./App";
import { PokedexProvider } from "./contexts/PokedexContext";


// Helper to render App with required providers
const renderApp = () => {
  return render(
    <BrowserRouter>
      <PokedexProvider>
        <App />
      </PokedexProvider>
    </BrowserRouter>,
  );
};

describe("App", () => {
  it("renders without crashing", () => {
    renderApp();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
