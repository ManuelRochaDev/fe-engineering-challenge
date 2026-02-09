import { usePokedex } from "../contexts/PokedexContext";
import { Button } from "./Button";

const CatchButton: React.FC<{ pokemonName: string; remove: boolean }> = ({
  pokemonName,
  remove,
}) => {
  const { addPokemon, removePokemon } = usePokedex();

  return (
    <Button
      variant={remove ? "danger" : "success"}
      className="w-28"
      onClick={() =>
        remove ? removePokemon(pokemonName) : addPokemon(pokemonName)
      }
    >
      {remove ? "Release" : "Catch"}
    </Button>
  );
};

export { CatchButton };
