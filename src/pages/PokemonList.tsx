import { PokemonCard } from "../components/views/Card/Card";
import { Progress } from "../components/Progress";
import { useFetchPokemonDetails } from "../hooks/useFetchPokemonDetails";

const PokemonList = () => {
  const { pokemonWithDetails, isLoading } = useFetchPokemonDetails({ limit: 20, offset: 0 });

  return (
    <>
      <Progress />
      {!isLoading && pokemonWithDetails.length > 0 && (
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
        >
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

export default PokemonList;
