import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Button } from "../components/Button";
import { StatBar } from "../components/StatBar";
import { TypeTag } from "../components/TypeTag";
import { usePokedex } from "../contexts/PokedexContext";
import { useFetchPokemonDetails } from "../hooks/useFetchPokemonDetails";
import { sharePokemon } from "../utils/share-pokemon";
import { getStatDisplayName } from "../utils/stat-mapper";
import { timestampToDate } from "../utils/timestamp-to-date";

const PokemonDetail = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { pokemonWithDetails, isLoading } = useFetchPokemonDetails({
    pokemonNames: name ? [name] : [],
  });
  const { isPokemonInPokedex, getPokemon, updatePokemonNote } =
    usePokedex();
  const pokedexData = getPokemon(name || "");
  const [note, setNote] = useState(pokedexData?.note || "");
  const [isEditingNote, setIsEditingNote] = useState(false);

  const handleSaveNote = () => {
    if (name) {
      updatePokemonNote(name, note);
      setIsEditingNote(false);
    }
  };

  const pokemonData = pokemonWithDetails[0];
  const details = pokemonData?.details;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  const isCaught = isPokemonInPokedex(name || "");

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="container mx-auto max-w-2xl p-4">
        <Button variant="link" className="mb-4" onClick={() => navigate("/")}>
          ← Back to List
        </Button>
        {details && (
          <Button
            variant="link"
            className="mb-4 ml-4"
            onClick={() => sharePokemon(name || "", pokedexData || undefined)}
          >
            Share
          </Button>
        )}

        {details ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={details.sprites?.front_default}
                alt={details.name}
                className="w-32 h-32"
              />
              <div>
                <div className="flex gap-2 items-center mb-2">
                  <h1 className="text-3xl font-bold capitalize">
                    {details.name}
                  </h1>
                  <div className="flex gap-2">
                    {details.types?.map((type) => (
                      <TypeTag key={type.type.name} type={type.type.name} />
                    ))}
                  </div>
                </div>
                <div className="text-gray-600">
                  <p>Weight: {(details.weight * 0.1).toFixed(1)} kg</p>
                  <p>Height: {details.height * 10} cm</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Stats</h2>
              {details.stats?.map((stat) => (
                <StatBar
                  key={stat.stat.name}
                  label={getStatDisplayName(stat.stat.name)}
                  value={stat.base_stat}
                />
              ))}
            </div>

            {/*notes section*/}
            {isCaught && (
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold">Notes</h2>
                  <span className="text-sm text-gray-500">
                    Caught {timestampToDate(pokedexData?.timestamp || 0)}
                  </span>
                </div>
                {isEditingNote ? (
                  <div className="space-y-2">
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Add a note about this Pokémon..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={4}
                      maxLength={500}
                    />
                    <div className="flex gap-2">
                      <Button variant="primary" onClick={handleSaveNote}>
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setNote(pokedexData?.note || "");
                          setIsEditingNote(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700 mb-2 whitespace-pre-wrap">
                      {pokedexData?.note || "No notes yet"}
                    </p>
                    <Button
                      variant="link"
                      className="text-sm"
                      onClick={() => setIsEditingNote(true)}
                    >
                      {pokedexData?.note ? "Edit Note" : "Add Note"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center bg-white rounded-lg shadow-md p-6 min-h-[400px]">
            {name} not found!
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;
