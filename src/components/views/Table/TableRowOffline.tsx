import { usePokedex } from "../../../contexts/PokedexContext";
import { CatchButton } from "../../CatchButton";

interface PokemonTableRowOfflineProps {
  pokemonName: string;
  showCheckbox?: boolean;
  selectedPokemon?: Set<string>;
  onToggleSelect?: (name: string) => void;
}

const PokemonTableRowOffline: React.FC<PokemonTableRowOfflineProps> = ({
  pokemonName,
  showCheckbox,
  selectedPokemon,
  onToggleSelect,
}) => {
  const { isPokemonInPokedex } = usePokedex();
  const isCaught = isPokemonInPokedex(pokemonName);

  return (
    <tr className="border-t hover:bg-gray-200 even:bg-gray-100">
      {showCheckbox && onToggleSelect && (
        <td className="px-3 py-3">
          <input
            id={`select-table-${pokemonName}`}
            type="checkbox"
            checked={selectedPokemon?.has(pokemonName)}
            onChange={() => onToggleSelect(pokemonName)}
            aria-label={`Select ${pokemonName}`}
            className="w-4 h-4 cursor-pointer"
          />
        </td>
      )}
      <td className="px-3 py-3">
        <span className="text-4xl">❓</span>
      </td>
      <td className="px-3 py-3 font-semibold capitalize">{pokemonName}</td>
      <td className="px-3 py-3 text-gray-500">-</td>
      <td className="px-3 py-3 text-gray-500">-</td>
      <td className="px-3 py-3 text-gray-500">-</td>
      <td className="px-4 py-3">
        <div>
          <CatchButton pokemonName={pokemonName} remove={isCaught} />
        </div>
      </td>
    </tr>
  );
};

export { PokemonTableRowOffline };
