import { Progress } from "../components/Progress";
import { FilterSort } from "../components/FilterSort";
import { Loading } from "../components/Loading";
import { useFetchPokemonDetails } from "../hooks/useFetchPokemonDetails";
import { useFilteredPokemonList } from "../hooks/useFilteredPokemonList";
import { usePokedex } from "../contexts/PokedexContext";
import { useState } from "react";
import { PokemonGrid } from "../components/views/Grid";
import { PokemonTable } from "../components/views/Table/Table";
import { Pagination } from "../components/Pagination";
import { ViewModeToggle } from "../components/views/ViewModeToggle";
import { BulkActions } from "../components/BulkActions";
import { EmptyState } from "../components/EmptyState";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const limit = 20;
  const { pokemonWithDetails, isLoading, totalCount } = useFetchPokemonDetails({
    limit,
    offset: (page - 1) * limit,
  });
  const { filters, setFilters, filteredPokemons } = useFilteredPokemonList({
    pokemonWithDetails,
  });
  console.log(filteredPokemons);
  const { addPokemon, removePokemon, isPokemonInPokedex } = usePokedex();
  const [selectedPokemon, setSelectedPokemon] = useState<Set<string>>(
    new Set(),
  );
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

  const totalPages = Math.ceil(totalCount / limit);

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
      <Progress />
      <FilterSort filters={filters} onFilterChange={setFilters} />
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
        onCatch={handleBulkCatch}
        onRelease={handleBulkRelease}
        onClear={() => setSelectedPokemon(new Set())}
      />

      {!isLoading && filteredPokemons.length === 0 && (
        <EmptyState message="No Pokémon found" />
      )}
      {!isLoading && filteredPokemons.length > 0 && (
        <>
          {viewMode === "grid" ? (
            <PokemonGrid
              pokemons={filteredPokemons}
              selectedPokemon={selectedPokemon}
              onToggleSelect={toggleSelection}
            />
          ) : (
            <PokemonTable
              pokemons={filteredPokemons}
              showCheckbox
              selectedPokemon={selectedPokemon}
              onToggleSelect={toggleSelection}
            />
          )}
        </>
      )}
      {!isLoading && totalCount > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8 mb-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            isLoading={isLoading}
          />
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
