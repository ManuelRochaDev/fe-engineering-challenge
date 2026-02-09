import type { PokemonApiResponse } from "../interfaces/Pokemon";
import type { PokemonDetails } from "../interfaces/PokemonDetails";

export const getPokemonByName = (name: string): Promise<PokemonDetails> => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error fetching Pokémon with name ${name}: ${response.statusText}`,
        );
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const getPokemons = (limit = 20, offset = 0): Promise<PokemonApiResponse> => {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching Pokémons: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
