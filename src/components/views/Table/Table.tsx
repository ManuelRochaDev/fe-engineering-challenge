import { usePokedex } from "../../../contexts/PokedexContext";
import type { PokemonWithDetails } from "../../../interfaces/PokemonWithDetails";
import { PokemonTableRow } from "./TableRow";
import { PokemonTableRowOffline } from "./TableRowOffline";

interface PokemonTableProps {
  pokemons: PokemonWithDetails[];
  showCheckbox?: boolean;
  selectedPokemon?: Set<string>;
  onToggleSelect?: (name: string) => void;
}

const PokemonTable: React.FC<PokemonTableProps> = ({
  pokemons,
  showCheckbox,
  selectedPokemon,
  onToggleSelect,
}) => {
  const { isPokemonInPokedex, getPokemon } = usePokedex();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-red-500 text-white">
          <tr>
            {showCheckbox && <th className="px-3 py-3 text-left"></th>}
            <th className="px-3 py-3 text-left">Image</th>
            <th className="px-3 py-3 text-left">Name</th>
            <th className="px-3 py-3 text-left">Types</th>
            <th className="px-3 py-3 text-left">Height</th>
            <th className="px-3 py-3 text-left">Weight</th>
            <th className="px-3 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map(({ pokemon, details }) => {
            const isCaught = isPokemonInPokedex(pokemon.name);
            const pokemonData = getPokemon(pokemon.name);

            //offline mode
            if (!details) {
              return (
                <PokemonTableRowOffline
                  key={pokemon.name}
                  pokemonName={pokemon.name}
                  showCheckbox={showCheckbox}
                  selectedPokemon={selectedPokemon}
                  onToggleSelect={onToggleSelect}
                />
              );
            }

            return (
              <PokemonTableRow
                key={pokemon.name}
                pokemonName={pokemon.name}
                details={details}
                pokemonData={pokemonData}
                isCaught={isCaught}
                showCheckbox={showCheckbox}
                selectedPokemon={selectedPokemon}
                onToggleSelect={onToggleSelect}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { PokemonTable };
