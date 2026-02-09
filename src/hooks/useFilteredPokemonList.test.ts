import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFilteredPokemonList } from "./useFilteredPokemonList";
import { usePokedex } from "../contexts/PokedexContext";
import type { PokemonWithDetails } from "../interfaces/PokemonWithDetails";

vi.mock("../contexts/PokedexContext");

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
      getPokemonData: vi.fn().mockReturnValue({ timestamp: 0 }),
    } as any);
  });

  it("returns all pokemons when no filters applied", () => {
    const { result } = renderHook(() =>
      useFilteredPokemonList({
        pokemonWithDetails: mockPokemonWithDetails,
      }),
    );

    expect(result.current.filteredPokemons).toHaveLength(4);
    expect(result.current.filters.searchName).toBe("");
    expect(result.current.filters.sortBy).toBe("none");
  });

  it("filters by name", () => {
    const { result } = renderHook(() =>
      useFilteredPokemonList({
        pokemonWithDetails: mockPokemonWithDetails,
      }),
    );

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        searchName: "char",
      });
    });

    expect(result.current.filteredPokemons).toHaveLength(1);
    expect(result.current.filteredPokemons[0].pokemon.name).toBe("charizard");
  });

  it("filters by type", () => {
    const { result } = renderHook(() =>
      useFilteredPokemonList({
        pokemonWithDetails: mockPokemonWithDetails,
      }),
    );

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        filterType: "fire",
      });
    });

    expect(result.current.filteredPokemons).toHaveLength(1);
    expect(result.current.filteredPokemons[0].pokemon.name).toBe("charizard");
  });

  it.each([
    {
      order: "asc" as const,
      expected: ["bulbasaur", "charizard", "failed_fetch", "pikachu"],
    },
    {
      order: "desc" as const,
      expected: ["pikachu", "failed_fetch", "charizard", "bulbasaur"],
    },
  ])("sorts by $order order", ({ order, expected }) => {
    const { result } = renderHook(() =>
      useFilteredPokemonList({
        pokemonWithDetails: mockPokemonWithDetails,
      }),
    );

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        sortBy: "name",
        sortOrder: order,
      });
    });

    expect(result.current.filteredPokemons[0].pokemon.name).toBe(expected[0]);
    expect(result.current.filteredPokemons[1].pokemon.name).toBe(expected[1]);
    expect(result.current.filteredPokemons[2].pokemon.name).toBe(expected[2]);
    expect(result.current.filteredPokemons[3].pokemon.name).toBe(expected[3]);
  });

  it("sorts by height", () => {
    const { result } = renderHook(() =>
      useFilteredPokemonList({
        pokemonWithDetails: mockPokemonWithDetails,
      }),
    );

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        sortBy: "height",
        sortOrder: "asc",
      });
    });

    expect(result.current.filteredPokemons[0].pokemon.name).toBe("failed_fetch");
    expect(result.current.filteredPokemons[1].pokemon.name).toBe("pikachu");
    expect(result.current.filteredPokemons[2].pokemon.name).toBe("bulbasaur");
    expect(result.current.filteredPokemons[3].pokemon.name).toBe("charizard");
  });

  it("combines name filter and sorting", () => {
    const { result } = renderHook(() =>
      useFilteredPokemonList({
        pokemonWithDetails: [
          {
            pokemon: { name: "charmander" },
            details: {
              id: 4,
              name: "charmander",
              height: 6,
              weight: 85,
              sprites: { front_default: "" },
              types: [{ type: { name: "fire" } }],
              stats: [{ base_stat: 39, stat: { name: "hp" } }],
            },
          },
          {
            pokemon: { name: "charmeleon" },
            details: {
              id: 5,
              name: "charmeleon",
              height: 11,
              weight: 190,
              sprites: { front_default: "" },
              types: [{ type: { name: "fire" } }],
              stats: [{ base_stat: 58, stat: { name: "hp" } }],
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
              types: [{ type: { name: "fire" } }],
              stats: [{ base_stat: 78, stat: { name: "hp" } }],
            },
          },
        ],
      }),
    );

    act(() => {
      result.current.setFilters({
        searchName: "char",
        filterType: "",
        sortBy: "name",
        sortOrder: "desc",
      });
    });

    expect(result.current.filteredPokemons).toHaveLength(3);
    expect(result.current.filteredPokemons[0].pokemon.name).toBe("charmeleon");
    expect(result.current.filteredPokemons[1].pokemon.name).toBe("charmander");
    expect(result.current.filteredPokemons[2].pokemon.name).toBe("charizard");
  });

  it("returns empty array when no pokemons provided", () => {
    const { result } = renderHook(() =>
      useFilteredPokemonList({
        pokemonWithDetails: [],
      }),
    );

    expect(result.current.filteredPokemons).toHaveLength(0);
  });
});
