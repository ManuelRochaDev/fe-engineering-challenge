import { Progress } from "../components/Progress";
import { usePokedex } from "../contexts/PokedexContext";
import { Loading } from "../components/Loading";
import { useFetchPokemonDetails } from "../hooks/useFetchPokemonDetails";
import { FilterSort } from "../components/FilterSort";
import { useFilteredPokemonList } from "../hooks/useFilteredPokemonList";
import { usePagination } from "../hooks/usePagination";
import { useState } from "react";
import { exportPokedexToCSV } from "../utils/export-csv";
import { PokemonGrid } from "../components/views/Grid";
import { PokemonTable } from "../components/views/Table/Table";
import { Pagination } from "../components/Pagination";
import { ViewModeToggle } from "../components/views/ViewModeToggle";
import { BulkActions } from "../components/BulkActions";
import { EmptyState } from "../components/EmptyState";

const Pokedex = () => {
  const { pokedex, removePokemon } = usePokedex();
  const pokemonNames = pokedex.map((entry) => entry.name);
  const { pokemonWithDetails, isLoading } = useFetchPokemonDetails({
    pokemonNames,
  });
  const [selectedPokemon, setSelectedPokemon] = useState<Set<string>>(
    new Set(),
  );
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [page, setPage] = useState(1);
  const limit = 20;

  const { filters, setFilters, filteredPokemons } = useFilteredPokemonList({
    pokemonWithDetails,
  });

  const { paginatedItems: paginatedPokemons, totalPages } = usePagination({
    items: filteredPokemons,
    page,
    limit,
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

  const handleExportCSV = () => {
    exportPokedexToCSV(pokedex, pokemonWithDetails);
  };

  return (
    <>
      <Progress />
      <FilterSort
        filters={filters}
        onFilterChange={setFilters}
        onExport={pokedex.length > 0 ? handleExportCSV : undefined}
      />
      <div className="flex flex-col items-center sm:flex-row sm:relative sm:justify-center sm:items-center gap-4 mb-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isLoading={isLoading}
        />
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
      {!isLoading && pokedex.length > 0 && pokemonWithDetails.length > 0 && (
        <>
          {viewMode === "grid" ? (
            <PokemonGrid
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
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                isLoading={isLoading}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Pokedex;
