import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFetchPokemonDetails } from "./useFetchPokemonDetails";
import * as pokeApiService from "../services/pokeapi-service";

vi.mock("../services/pokeapi-service");

describe("useFetchPokemonDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches pokemon list when no names are provided", async () => {
    //mock API response
    vi.mocked(pokeApiService.getPokemons).mockResolvedValue({
      count: 1302,
      next: null,
      previous: null,
      results: [
        { name: "bulbasaur" },
        { name: "ivysaur" },
      ],
    });

    vi.mocked(pokeApiService.getPokemonByName).mockResolvedValue({
      id: 1,
      name: "bulbasaur",
      height: 7,
      weight: 69,
      sprites: { front_default: "url" },
      types: [],
      stats: [],
    } as any);

    const { result } = renderHook(() =>
      useFetchPokemonDetails({ limit: 2, offset: 0 }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.pokemonWithDetails).toHaveLength(2);
    expect(result.current.totalCount).toBe(1302);
  });

  it("fetches specific pokemon when names are provided", async () => {
    vi.mocked(pokeApiService.getPokemonByName)
      .mockResolvedValueOnce({
        id: 25,
        name: "pikachu",
        height: 4,
        weight: 60,
        sprites: { front_default: "url" },
        types: [],
        stats: [],
      } as any)
      .mockResolvedValueOnce({
        id: 6,
        name: "charizard",
        height: 17,
        weight: 905,
        sprites: { front_default: "url" },
        types: [],
        stats: [],
      } as any);

    const { result } = renderHook(() =>
      useFetchPokemonDetails({ pokemonNames: ["pikachu", "charizard"] }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.pokemonWithDetails).toHaveLength(2);
    expect(result.current.pokemonWithDetails[0].pokemon.name).toBe("pikachu");
    expect(result.current.pokemonWithDetails[1].pokemon.name).toBe("charizard");
    expect(pokeApiService.getPokemonByName).toHaveBeenCalledTimes(2);
  });

  it("handles offline mode when API fails", async () => {
    vi.mocked(pokeApiService.getPokemons).mockRejectedValue(
      new Error("Network error"),
    );

    const { result } = renderHook(() =>
      useFetchPokemonDetails({ limit: 20, offset: 0 }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.pokemonWithDetails).toHaveLength(0);
  });

  it("keeps pokemon with null details when individual fetch fails", async () => {
    vi.mocked(pokeApiService.getPokemons).mockResolvedValue({
      count: 1302,
      next: null,
      previous: null,
      results: [
        { name: "bulbasaur" },
        { name: "ivysaur" },
      ],
    });

    vi.mocked(pokeApiService.getPokemonByName)
      .mockResolvedValueOnce({
        id: 1,
        name: "bulbasaur",
        height: 7,
        weight: 69,
        sprites: { front_default: "url" },
        types: [],
        stats: [],
      } as any)
      .mockRejectedValueOnce(new Error("Failed to fetch ivysaur"));

    const { result } = renderHook(() =>
      useFetchPokemonDetails({ limit: 2, offset: 0 }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.pokemonWithDetails).toHaveLength(2);
    expect(result.current.pokemonWithDetails[0].pokemon.name).toBe("bulbasaur");
    expect(result.current.pokemonWithDetails[0].details).not.toBeNull();
    expect(result.current.pokemonWithDetails[1].pokemon.name).toBe("ivysaur");
    expect(result.current.pokemonWithDetails[1].details).toBeNull();
  });
});
