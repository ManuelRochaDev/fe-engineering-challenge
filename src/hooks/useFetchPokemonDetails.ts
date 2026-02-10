import { useEffect, useState } from "react";

import type { PokemonWithDetails } from "../interfaces/PokemonWithDetails";
import { getPokemonByName, getPokemons } from "../services/pokeapi-service";

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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let names: string[];

        //if pokemonNames is provided use it, otherwise fetch the list
        if (pokemonNames && pokemonNames.length > 0) {
          names = pokemonNames;
        } else {
          const data = await getPokemons(limit, offset);
          names = data.results.map((p) => p.name);
        }

        //batching
        const batchSize = 50;
        const results: typeof pokemonWithDetails = [];
        
        for (let i = 0; i < names.length; i += batchSize) {
          const batch = names.slice(i, i + batchSize);
          const batchPromises = batch.map(async (name) => {
            try {
              const details = await getPokemonByName(name);
              return { details, pokemon: { name } };
            } catch (error) {
              console.error(`Failed to fetch details for ${name}:`, error);
              //use null details for offline mode
              return { details: null, pokemon: { name } };
            }
          });
          
          const batchResults = await Promise.all(batchPromises);
          results.push(...batchResults);
        }

        setPokemonWithDetails(results);
      } catch (error) {
        console.error("Failed to fetch pokemon data: ", error);
        setPokemonWithDetails([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonNames?.join(","), limit, offset]);

  return { isLoading, pokemonWithDetails };
};
