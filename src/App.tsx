import "./App.css";
import { Route, Routes } from "react-router";
import PokemonDetail from "./pages/PokemonDetail";
import HomePage from "./pages/HomePage";
import Pokedex from "./pages/Pokedex";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16">
        <Routes>
          <Route path={""} element={<HomePage />} />
          <Route path={"/pokemon/:name"} element={<PokemonDetail />} />
          <Route path={"/pokedex"} element={<Pokedex />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
