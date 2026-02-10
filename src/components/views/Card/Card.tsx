import { memo } from "react";
import { useNavigate } from "react-router";

import { usePokedex } from "../../../contexts/PokedexContext";
import type { PokemonWithDetails } from "../../../interfaces/PokemonWithDetails";
import { sharePokemon } from "../../../utils/share-pokemon";
import { getStatDisplayName } from "../../../utils/stat-mapper";
import { timestampToDate } from "../../../utils/timestamp-to-date";
import { getEmojiForType } from "../../../utils/type-emoji-mapper";
import { Button } from "../../Button";
import { CatchButton } from "../../CatchButton";
import { StatBar } from "../../StatBar";
import { CardOffline } from "./CardOffline";

interface CardProps {
  pokemonWithDetails: PokemonWithDetails;
  isSelected?: boolean;
  onToggleSelect?: (name: string) => void;
}

const Card: React.FC<CardProps> = memo(({
  pokemonWithDetails,
  isSelected = false,
  onToggleSelect,
}) => {
  const { pokemon, details } = pokemonWithDetails;
  const navigate = useNavigate();
  const { isPokemonInPokedex, getPokemon } = usePokedex();
  const isCaught = isPokemonInPokedex(pokemon.name);
  const pokemonData = getPokemon(pokemon.name);

  if (!details) {
    return (
      <CardOffline
        pokemon={pokemon}
        isSelected={isSelected}
        onToggleSelect={onToggleSelect}
      />
    );
  }

  return (
    <div
      className={
        "bg-gray-200 rounded-md gap-4 flex flex-col items-center p-4 relative"
      }
      key={details.id}
    >
      {onToggleSelect && (
        <input
          id={`select-${pokemon.name}`}
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(pokemon.name)}
          aria-label={`Select ${pokemon.name}`}
          className="absolute top-2 left-2 w-5 h-5 cursor-pointer"
        />
      )}
      <div className="flex h-20 w-full">
        <img
          src={details.sprites?.front_default}
          alt={pokemon.name}
          className="w-16 mr-4"
        />
        <div>
          <div className="flex justify-between">
            <p className="font-bold text-l capitalize">
              {pokemon.name}{" "}
              {details.types?.map((type) => (
                <span key={type.type.name} title={type.type.name}>
                  {getEmojiForType(type.type.name)}
                </span>
              ))}
            </p>
          </div>
          <div>
            <p>W: {(details.weight * 0.1).toFixed(2)} kg</p>
            <p>H: {details.height * 10} cm</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        {details.stats?.map((stat) => (
          <StatBar
            key={stat.stat.name}
            label={getStatDisplayName(stat.stat.name)}
            value={stat.base_stat}
          />
        ))}
      </div>
      <div className="flex justify-between w-full">
        <Button
          variant="secondary"
          className="bg-gray-500 hover:bg-gray-600 text-white w-28"
          onClick={() => navigate(`/pokemon/${pokemon.name}`)}
        >
          Details
        </Button>
        <CatchButton pokemonName={pokemon.name} remove={isCaught} />
      </div>{" "}
      <div className="mt-2">
        <Button
          variant="link"
          onClick={() => sharePokemon(pokemon.name, pokemonData)}
          className="w-full"
        >
          Share
        </Button>
      </div>{" "}
      <p className="h-6 text-sm">
        {isCaught && (
          <>
            Caught @{" "}
            <span className="font-bold">
              {timestampToDate(pokemonData?.timestamp || 0)}
            </span>
          </>
        )}
      </p>
    </div>
  );
});

Card.displayName = "Card";

export { Card };
