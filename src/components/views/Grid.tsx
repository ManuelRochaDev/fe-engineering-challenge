import type { PokemonWithDetails } from "../../interfaces/PokemonWithDetails";
import { PokemonCard } from "./Card/Card";

interface PokemonGridProps {
  pokemons: PokemonWithDetails[];
  selectedPokemon?: Set<string>;
  onToggleSelect?: (name: string) => void;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemons,
  selectedPokemon,
  onToggleSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {pokemons.map((pokemonWithDetails) => (
        <PokemonCard
          key={pokemonWithDetails.pokemon.name}
          pokemonWithDetails={pokemonWithDetails}
          isSelected={selectedPokemon?.has(pokemonWithDetails.pokemon.name)}
          onToggleSelect={
            onToggleSelect &&
            (() => onToggleSelect(pokemonWithDetails.pokemon.name))
          }
        />
      ))}
    </div>
  );
};

export { PokemonGrid };
