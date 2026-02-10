import { useEffect, useState } from "react";

import { usePokedex } from "../contexts/PokedexContext";
import { getPokemons } from "../services/pokeapi-service";

const PokedexProgress: React.FC = () => {
  const { pokedex } = usePokedex();
  const [totalPokemon, setTotalPokemon] = useState(0);

  useEffect(() => {
    getPokemons(1, 0).then((response) => {
      setTotalPokemon(response.count);
    });
  }, []);

  return (
    <div className="my-4">
      <div className="w-full bg-gray-600 h-8 relative flex items-center justify-center">
        <span className="absolute text-white text-sm z-10">
          Pokémons caught: {pokedex.length} / {totalPokemon}
        </span>
        {totalPokemon > 0 && (
          <div
            className="bg-red-500 h-8 absolute left-0 top-0"
            style={{ width: `${(pokedex.length / totalPokemon) * 100}%` }}
          ></div>
        )}
      </div>
    </div>
  );
};

export { PokedexProgress };
