import { useMemo, useState } from "react";

import { usePokedex } from "../contexts/PokedexContext";
import type { FilterOptions } from "../interfaces/FilterOptions";
import { useFetchPokemonDetails } from "./useFetchPokemonDetails";
import { usePagination } from "./usePagination";

interface UseFilteredPokemonListProps {
  pokemonNames?: string[];
  page?: number;
  limit?: number;
}

export const useFilteredPokemonList = ({
  pokemonNames,
  page = 1,
  limit = 20,
}: UseFilteredPokemonListProps = {}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    filterType: "",
    searchName: "",
    sortBy: "none",
    sortOrder: "asc",
  });
  const { getPokemon } = usePokedex();

  //limit and offset will only be used if pokemonNames is not provided (Pokedex)
  const { pokemonWithDetails, isLoading } = useFetchPokemonDetails({
    limit: 10000,
    offset: 0,
    pokemonNames,
  });

  const filteredPokemons = useMemo(() => {
    if (pokemonWithDetails.length === 0) return [];

    let filtered = [...pokemonWithDetails];

    //filter by name
    if (filters.searchName) {
      filtered = filtered.filter((p) =>
        p.pokemon.name.toLowerCase().includes(filters.searchName.toLowerCase()),
      );
    }

    //filter by type
    if (filters.filterType) {
      filtered = filtered.filter((p) =>
        p.details?.types?.some((t) => t.type.name === filters.filterType),
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
          const aTimestamp = getPokemon(a.pokemon.name)?.timestamp || 0;
          const bTimestamp = getPokemon(b.pokemon.name)?.timestamp || 0;
          compareValue = aTimestamp - bTimestamp;
        }

        return filters.sortOrder === "asc" ? compareValue : -compareValue;
      });
    }

    return filtered;
  }, [pokemonWithDetails, filters, getPokemon]);

  // Paginate filtered results
  const { paginatedItems: paginatedPokemons, totalPages } = usePagination({
    items: filteredPokemons,
    limit,
    page,
  });

  return {
    allPokemons: pokemonWithDetails,
    filters,
    isLoading,
    paginatedPokemons,
    setFilters,
    totalPages,
  };
};
