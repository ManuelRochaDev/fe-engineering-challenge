import { useNavigate } from "react-router";
import type { PokemonDetails } from "../../../interfaces/PokemonDetails";
import type { PokedexEntry } from "../../../services/pokedex-service";
import { Button } from "../../Button";
import { CatchButton } from "../../CatchButton";
import { sharePokemon } from "../../../utils/share-pokemon";
import { TypeTag } from "../../TypeTag";

interface PokemonTableRowProps {
  pokemonName: string;
  details: PokemonDetails;
  pokemonData: PokedexEntry | undefined;
  isCaught: boolean;
  showCheckbox?: boolean;
  selectedPokemon?: Set<string>;
  onToggleSelect?: (name: string) => void;
}

const PokemonTableRow: React.FC<PokemonTableRowProps> = ({
  pokemonName,
  details,
  pokemonData,
  isCaught,
  showCheckbox,
  selectedPokemon,
  onToggleSelect,
}) => {
  const navigate = useNavigate();

  return (
    <tr className="border-t hover:bg-gray-200 even:bg-gray-100">
      {showCheckbox && onToggleSelect && (
        <td className="px-4 py-3">
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
        <img
          src={details.sprites.front_default}
          alt={pokemonName}
          className="w-16 h-16 object-contain"
        />
      </td>
      <td className="px-3 py-3 font-semibold capitalize">{pokemonName}</td>
      <td className="px-3 py-3">
        <div className="flex gap-1">
          {details.types.map((type) => (
            <TypeTag key={type.type.name} type={type.type.name} />
          ))}
        </div>
      </td>
      <td className="px-3 py-3">{details.height / 10} m</td>
      <td className="px-3 py-3">{details.weight / 10} kg</td>
      <td className="px-3 py-3">
        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={() => navigate(`/pokemon/${pokemonName}`)}
          >
            Details
          </Button>
          <CatchButton pokemonName={pokemonName} remove={isCaught} />
          <Button
            variant="link"
            onClick={() => sharePokemon(pokemonName, pokemonData)}
          >
            Share
          </Button>
        </div>
      </td>
    </tr>
  );
};

export { PokemonTableRow };
