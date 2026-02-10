import { useMemo, useState } from "react";

import { BulkActions } from "../components/BulkActions";
import { EmptyState } from "../components/EmptyState";
import { FilterSort } from "../components/FilterSort";
import { Loading } from "../components/Loading";
import { Pagination } from "../components/Pagination";
import { PokedexProgress } from "../components/PokedexProgress";
import { Grid } from "../components/views/Grid";
import { PokemonTable } from "../components/views/Table/Table";
import { ViewModeToggle } from "../components/views/ViewModeToggle";
import { usePokedex } from "../contexts/PokedexContext";
import { useFilteredPokemonList } from "../hooks/useFilteredPokemonList";
import type { FilterOptions } from "../interfaces/FilterOptions";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const limit = 20;
  const {
    filters,
    setFilters,
    paginatedPokemons,
    totalPages,
    isLoading,
  } = useFilteredPokemonList({
    limit,
    page,
  });
  const { addPokemon, removePokemon, isPokemonInPokedex } = usePokedex();
  const [selectedPokemon, setSelectedPokemon] = useState<Set<string>>(
    new Set(),
  );
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

  const hasPokemons = paginatedPokemons.length > 0;

  const paginationProps = useMemo(
    () => ({
      currentPage: page,
      isLoading: isLoading,
      onPageChange: setPage,
      totalPages: totalPages,
    }),
    [page, totalPages, isLoading],
  );

  //reset page when filters change
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setPage(1);
  };

  const toggleSelection = (name: string) => {
    setSelectedPokemon((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  const handleBulkCatch = () => {
    selectedPokemon.forEach((name) => {
      if (!isPokemonInPokedex(name)) {
        addPokemon(name);
      }
    });
    setSelectedPokemon(new Set());
  };

  const handleBulkRelease = () => {
    selectedPokemon.forEach((name) => {
      if (isPokemonInPokedex(name)) {
        removePokemon(name);
      }
    });
    setSelectedPokemon(new Set());
  };

  return (
    <div className="container mx-auto">
      <PokedexProgress />
      <FilterSort filters={filters} onFilterChange={handleFilterChange} />
      <div className="flex flex-col items-center sm:flex-row sm:relative sm:justify-center sm:items-center gap-4 mb-4">
        <Pagination {...paginationProps} />
        <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>
      <BulkActions
        selectedCount={selectedPokemon.size}
        onCatch={handleBulkCatch}
        onRelease={handleBulkRelease}
        onClear={() => setSelectedPokemon(new Set())}
      />

      {!isLoading && !hasPokemons && (
        <EmptyState message="No Pokémon found" />
      )}
      {!isLoading && hasPokemons && (
        <>
          {viewMode === "grid" ? (
            <Grid
              pokemons={paginatedPokemons}
              selectedPokemon={selectedPokemon}
              onToggleSelect={toggleSelection}
            />
          ) : (
            <PokemonTable
              pokemons={paginatedPokemons}
              showCheckbox
              selectedPokemon={selectedPokemon}
              onToggleSelect={toggleSelection}
            />
          )}
        </>
      )}
      {!isLoading && hasPokemons && (
        <div className="flex justify-center items-center gap-4 mt-8 mb-4">
          <Pagination {...paginationProps} />
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center my-8">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default HomePage;
