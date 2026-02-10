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
import { exportPokedexToCSV } from "../utils/export-csv";

const Pokedex = () => {
  const { pokedex, removePokemon } = usePokedex();
  const pokemonNames = useMemo(() => pokedex.map((entry) => entry.name), [pokedex]);
  const [selectedPokemon, setSelectedPokemon] = useState<Set<string>>(
    new Set(),
  );
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [page, setPage] = useState(1);
  const limit = 20;

  const {
    filters,
    setFilters,
    paginatedPokemons,
    allPokemons,
    totalPages,
    isLoading,
  } = useFilteredPokemonList({
    limit,
    page,
    pokemonNames,
  });

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

  const handleBulkRelease = () => {
    selectedPokemon.forEach((name) => removePokemon(name));
    setSelectedPokemon(new Set());
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleExportCSV = () => {
    exportPokedexToCSV(pokedex, allPokemons);
  };

  const paginationProps = useMemo(
    () => ({
      currentPage: page,
      isLoading: isLoading,
      onPageChange: setPage,
      totalPages: totalPages,
    }),
    [page, totalPages, isLoading],
  );

  return (
    <>
      <PokedexProgress />
      <FilterSort
        filters={filters}
        onFilterChange={handleFilterChange}
        onExport={pokedex.length > 0 ? handleExportCSV : undefined}
      />
      <div className="flex flex-col items-center sm:flex-row sm:relative sm:justify-center sm:items-center gap-4 mb-4">
        <Pagination {...paginationProps} />
        <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>
      <BulkActions
        selectedCount={selectedPokemon.size}
        onRelease={handleBulkRelease}
        onClear={() => setSelectedPokemon(new Set())}
      />
      {isLoading && <Loading />}
      {!isLoading && pokedex.length === 0 && (
        <EmptyState message="No Pokémon caught yet!" />
      )}
      {!isLoading && pokedex.length > 0 && allPokemons.length > 0 && (
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
          {totalPages > 0 && (
            <div className="flex justify-center items-center gap-4 mt-8 mb-4">
              <Pagination {...paginationProps} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Pokedex;
