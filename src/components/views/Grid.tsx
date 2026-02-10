import type { PokemonWithDetails } from "../../interfaces/PokemonWithDetails";
import { Card } from "./Card/Card";

interface GridProps {
  pokemons: PokemonWithDetails[];
  selectedPokemon?: Set<string>;
  onToggleSelect?: (name: string) => void;
}

const Grid: React.FC<GridProps> = ({
  pokemons,
  selectedPokemon,
  onToggleSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {pokemons.map((pokemonWithDetails) => (
        <Card
          key={pokemonWithDetails.pokemon.name}
          pokemonWithDetails={pokemonWithDetails}
          isSelected={selectedPokemon?.has(pokemonWithDetails.pokemon.name)}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </div>
  );
};

export { Grid };
