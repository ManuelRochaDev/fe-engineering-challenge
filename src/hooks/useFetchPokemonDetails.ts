import { useEffect, useState } from "react";
import { getPokemonByName, getPokemons } from "../services/pokeapi-service";
import type { PokemonWithDetails } from "../interfaces/PokemonWithDetails";

interface UseFetchPokemonDetailsProps {
  pokemonNames?: string[];
  limit?: number;
  offset?: number;
}

export const useFetchPokemonDetails = ({
  pokemonNames,
  limit = 50,
  offset = 0,
}: UseFetchPokemonDetailsProps = {}) => {
  const [pokemonWithDetails, setPokemonWithDetails] = useState<PokemonWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsOffline(false);

      try {
        let names: string[];
        let fetchedTotalCount = 0;

        //if pokemonNames is provided use it, otherwise fetch the list
        if (pokemonNames && pokemonNames.length > 0) {
          names = pokemonNames;
        } else {
          const data = await getPokemons(limit, offset);
          names = data.results.map((p) => p.name);
          fetchedTotalCount = data.count;
        }

        const detailsPromises = names.map(async (name) => {
          try {
            const details = await getPokemonByName(name);
            return { pokemon: { name }, details };
          } catch {
            // Keep pokemon with null details for offline mode
            return { pokemon: { name }, details: null };
          }
        });
        
        const results = await Promise.all(detailsPromises);

        setPokemonWithDetails(results);
        setTotalCount(fetchedTotalCount);
      } catch (error) {
        console.error("Failed to fetch pokemon data: ", error);
        setIsOffline(true);
        setPokemonWithDetails([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pokemonNames?.join(","), limit, offset]);

  return { pokemonWithDetails, isLoading, totalCount, isOffline };
};
