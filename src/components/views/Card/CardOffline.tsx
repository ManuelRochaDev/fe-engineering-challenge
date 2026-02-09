import type { Pokemon } from "../../../interfaces/Pokemon";
import { CatchButton } from "../../CatchButton";
import { usePokedex } from "../../../contexts/PokedexContext";
import { timestampToDate } from "../../../utils/timestamp-to-date";
import { Button } from "../../Button";
import { sharePokemon } from "../../../utils/share-pokemon";

interface PokemonCardOfflineProps {
  pokemon: Pokemon;
  isSelected?: boolean;
  onToggleSelect?: () => void;
}

const PokemonCardOffline: React.FC<PokemonCardOfflineProps> = ({
  pokemon,
  isSelected = false,
  onToggleSelect,
}) => {
  const { isPokemonInPokedex, getPokemonData } = usePokedex();
  const isCaught = isPokemonInPokedex(pokemon.name);
  const pokemonData = getPokemonData(pokemon.name);

  return (
    <div
      className={
        "bg-gray-200 rounded-md gap-4 flex flex-col items-center p-4 relative min-w-[240px]"
      }
    >
      {onToggleSelect && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          aria-label={`Select ${pokemon.name}`}
          className="absolute top-2 left-2 w-5 h-5 cursor-pointer"
        />
      )}
      <div className="flex flex-col items-center gap-2 py-4">
        <span className="text-6xl">❓</span>
        <h3 className="text-xl font-bold capitalize">{pokemon.name}</h3>
        {isCaught && pokemonData && (
          <p className="text-sm text-gray-600">
            Caught: {timestampToDate(pokemonData.timestamp)}
          </p>
        )}
      </div>
      <CatchButton pokemonName={pokemon.name} remove={isCaught} />
      {isCaught && (
        <Button
          variant="link"
          onClick={() => sharePokemon(pokemon.name, pokemonData)}
          className="w-full"
        >
          Share
        </Button>
      )}
    </div>
  );
};

export { PokemonCardOffline };
