import { useState, useMemo } from "react";
import type { PokemonWithDetails } from "../interfaces/PokemonWithDetails";
import type { FilterOptions } from "../interfaces/FilterOptions";
import { usePokedex } from "../contexts/PokedexContext";

interface UseFilteredPokemonListProps {
  pokemonWithDetails: PokemonWithDetails[];
}

export const useFilteredPokemonList = ({ pokemonWithDetails }: UseFilteredPokemonListProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    searchName: "",
    filterType: "",
    sortBy: "none",
    sortOrder: "asc",
  });
  const { getPokemonData } = usePokedex();

  const filteredPokemons = useMemo(() => {
    if (pokemonWithDetails.length === 0) return [];

    let filtered = [...pokemonWithDetails];

    //filter by name
    if (filters.searchName) {
      filtered = filtered.filter((p) =>
        p.pokemon.name.toLowerCase().includes(filters.searchName.toLowerCase())
      );
    }

    //filter by type
    if (filters.filterType) {
      filtered = filtered.filter((p) =>
        p.details?.types?.some((t) => t.type.name === filters.filterType)
      );
    }

    //sort
    if (filters.sortBy !== "none") {
      filtered.sort((a, b) => {
        let compareValue = 0;

        if (filters.sortBy === "name") {
          compareValue = a.pokemon.name.localeCompare(b.pokemon.name);
        } else if (filters.sortBy === "height") {
          const aHeight = a.details?.height ?? 0;
          const bHeight = b.details?.height ?? 0;
          compareValue = aHeight - bHeight;
        } else if (filters.sortBy === "timestamp") {
          const aTimestamp = getPokemonData(a.pokemon.name)?.timestamp || 0;
          const bTimestamp = getPokemonData(b.pokemon.name)?.timestamp || 0;
          compareValue = aTimestamp - bTimestamp;
        }

        return filters.sortOrder === "asc" ? compareValue : -compareValue;
      });
    }

    return filtered;
  }, [pokemonWithDetails, filters, getPokemonData]);

  return { filters, setFilters, filteredPokemons };
};
