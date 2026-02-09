import type { Pokemon } from "./Pokemon";
import type { PokemonDetails } from "./PokemonDetails";

export interface PokemonWithDetails {
  pokemon: Pokemon;
  details: PokemonDetails | null;
}
