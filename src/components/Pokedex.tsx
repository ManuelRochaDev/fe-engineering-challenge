import { Progress } from "./Progress";
import { PokemonCard } from "./views/Card/Card";
import { usePokedex } from "../contexts/PokedexContext";
import { Loading } from "./Loading";
import { useFetchPokemonDetails } from "../hooks/useFetchPokemonDetails";

const Pokedex = () => {
  const { pokedex } = usePokedex();
  const pokemonNames = pokedex.map((entry) => entry.name);
  const { pokemonWithDetails, isLoading } = useFetchPokemonDetails({ pokemonNames });

  return (
    <>
      <Progress />
      {isLoading && <Loading />}
      {!isLoading && pokedex.length === 0 && (
        <div className="flex justify-center items-center py-20">
          <div className="text-xl font-semibold text-gray-600">
            No Pokémon caught yet!
          </div>
        </div>
      )}
      {!isLoading && pokedex.length > 0 && pokemonWithDetails.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center">
          {pokemonWithDetails.map((pokemonWithDetails) => (
            <PokemonCard
              key={pokemonWithDetails.pokemon.name}
              pokemonWithDetails={pokemonWithDetails}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Pokedex;
