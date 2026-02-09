import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { PokedexProvider, usePokedex } from "./PokedexContext";
import type { ReactNode } from "react";

describe("PokedexContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <PokedexProvider>{children}</PokedexProvider>
  );

  it("should add pokemon to pokedex", () => {
    const { result } = renderHook(() => usePokedex(), { wrapper });

    act(() => {
      result.current.addPokemon("pikachu");
    });

    expect(result.current.pokedex).toHaveLength(1);
    expect(result.current.pokedex[0].name).toBe("pikachu");
  });

  it("should not add duplicate pokemon", () => {
    const { result } = renderHook(() => usePokedex(), { wrapper });

    act(() => {
      result.current.addPokemon("pikachu");
      result.current.addPokemon("pikachu");
    });

    expect(result.current.pokedex).toHaveLength(1);
  });

  it("should add pokemon and note", () => {
    const { result } = renderHook(() => usePokedex(), { wrapper });

    act(() => {
      result.current.addPokemon("pikachu", "My favorite!");
    });

    const pokemon = result.current.getPokemonData("pikachu");
    expect(pokemon?.note).toBe("My favorite!");
  });

  it("should remove pokemon from pokedex", () => {
    const { result } = renderHook(() => usePokedex(), { wrapper });

    act(() => {
      result.current.addPokemon("pikachu");
      result.current.removePokemon("pikachu");
    });

    expect(result.current.isPokemonInPokedex("pikachu")).toBe(false);
  });

  it("should update pokemon note", () => {
    const { result } = renderHook(() => usePokedex(), { wrapper });

    act(() => {
      result.current.addPokemon("pikachu", "Original note");
      result.current.updatePokemonNote("pikachu", "Updated note");
    });

    const pokemon = result.current.getPokemonData("pikachu");
    expect(pokemon?.note).toBe("Updated note");
  });

  it("should persist to localStorage", () => {
    const { result } = renderHook(() => usePokedex(), { wrapper });

    act(() => {
      result.current.addPokemon("pikachu");
    });

    const stored = localStorage.getItem("pokedex");
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].name).toBe("pikachu");
  });

  it("should load from localStorage on mount", () => {
    localStorage.setItem(
      "pokedex",
      JSON.stringify([{ name: "pikachu", timestamp: Date.now() }]),
    );

    const { result } = renderHook(() => usePokedex(), { wrapper });

    expect(result.current.pokedex).toHaveLength(1);
    expect(result.current.pokedex[0].name).toBe("pikachu");
  });

  it("should throw error when used outside provider", () => {
    expect(() => {
      renderHook(() => usePokedex());
    }).toThrow("usePokedex must be used within a PokedexProvider");
  });
});
