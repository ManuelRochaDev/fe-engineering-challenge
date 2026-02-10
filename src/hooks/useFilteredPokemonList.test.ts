import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { usePokedex } from "../contexts/PokedexContext";
import type { PokemonWithDetails } from "../interfaces/PokemonWithDetails";
import { useFetchPokemonDetails } from "./useFetchPokemonDetails";
import { useFilteredPokemonList } from "./useFilteredPokemonList";
import { usePagination } from "./usePagination";

vi.mock("../contexts/PokedexContext");
vi.mock("./useFetchPokemonDetails");
vi.mock("./usePagination");

describe("useFilteredPokemonList", () => {
  const mockPokemonWithDetails: PokemonWithDetails[] = [
    {
      pokemon: { name: "pikachu" },
      details: {
        id: 25,
        name: "pikachu",
        height: 4,
        weight: 60,
        sprites: { front_default: "" },
        types: [{ type: { name: "electric" } }],
        stats: [{ base_stat: 35, stat: { name: "hp" } }],
      },
    },
    {
      pokemon: { name: "charizard" },
      details: {
        id: 6,
        name: "charizard",
        height: 17,
        weight: 905,
        sprites: { front_default: "" },
        types: [{ type: { name: "fire" } }, { type: { name: "flying" } }],
        stats: [{ base_stat: 78, stat: { name: "hp" } }],
      },
    },
    {
      pokemon: { name: "bulbasaur" },
      details: {
        id: 1,
        name: "bulbasaur",
        height: 7,
        weight: 69,
        sprites: { front_default: "" },
        types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
        stats: [{ base_stat: 45, stat: { name: "hp" } }],
      },
    },
    {
      pokemon: { name: "failed_fetch" },
      details: null, //pokemon with null details for offline mode
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(usePokedex).mockReturnValue({
      getPokemon: vi.fn().mockReturnValue({ timestamp: 0 }),
    } as unknown as ReturnType<typeof usePokedex>);
    vi.mocked(useFetchPokemonDetails).mockReturnValue({
      pokemonWithDetails: mockPokemonWithDetails,
      isLoading: false,
    });
    vi.mocked(usePagination).mockReturnValue({
      paginatedItems: mockPokemonWithDetails,
      totalPages: 1,
    });
  });

  it("returns all pokemons when no filters applied", () => {
    const { result } = renderHook(() => useFilteredPokemonList({}));

    expect(result.current.paginatedPokemons).toHaveLength(4);
    expect(result.current.filters.searchName).toBe("");
    expect(result.current.filters.sortBy).toBe("none");
  });

  it("filters by name", () => {
    const { result } = renderHook(() => useFilteredPokemonList({}));

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        searchName: "char",
      });
    });
    
    expect(vi.mocked(usePagination)).toHaveBeenCalled();
  });

  it("filters by type", () => {
    const { result } = renderHook(() => useFilteredPokemonList({}));

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        filterType: "fire",
      });
    });

    expect(vi.mocked(usePagination)).toHaveBeenCalled();
  });

  it("returns empty array when no pokemons provided", () => {
    vi.mocked(useFetchPokemonDetails).mockReturnValue({
      pokemonWithDetails: [],
      isLoading: false,
    });
    vi.mocked(usePagination).mockReturnValue({
      paginatedItems: [],
      totalPages: 0,
    });

    const { result } = renderHook(() => useFilteredPokemonList({}));

    expect(result.current.paginatedPokemons).toHaveLength(0);
  });
});
