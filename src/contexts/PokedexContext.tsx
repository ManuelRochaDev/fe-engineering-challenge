/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { PokedexEntry } from "../services/pokedex-service";

const POKEDEX_KEY = "pokedex";

interface PokedexContextType {
  pokedex: PokedexEntry[];
  addPokemon: (name: string, note?: string) => void;
  removePokemon: (name: string) => void;
  isPokemonInPokedex: (name: string) => boolean;
  getPokedexCount: () => number;
  getPokemon: (name: string) => PokedexEntry | undefined;
  updatePokemonNote: (name: string, note: string) => void;
}

const PokedexContext = createContext<PokedexContextType | undefined>(undefined);

export const PokedexProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pokedex, setPokedex] = useState<PokedexEntry[]>(() => {
    const stored = localStorage.getItem(POKEDEX_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  //sync to localstorage whenever pokedex is updated
  useEffect(() => {
    localStorage.setItem(POKEDEX_KEY, JSON.stringify(pokedex));
  }, [pokedex]);

  const addPokemon = useCallback((name: string, note?: string) => {
    setPokedex((prev) => {
      //check if pokemon already exists
      if (prev.some((entry) => entry.name === name)) {
        return prev;
      }

      const newEntry: PokedexEntry = {
        name,
        timestamp: Date.now(),
        ...(note && { note }),
      };

      return [...prev, newEntry];
    });
  }, []);

  const removePokemon = useCallback((name: string) => {
    setPokedex((prev) => prev.filter((entry) => entry.name !== name));
  }, []);

  const isPokemonInPokedex = useCallback((name: string): boolean => {
    return pokedex.some((entry) => entry.name === name);
  }, [pokedex]);

  const getPokedexCount = useCallback((): number => {
    return pokedex.length;
  }, [pokedex]);

  const getPokemon = useCallback((name: string): PokedexEntry | undefined => {
    return pokedex.find((entry) => entry.name === name);
  }, [pokedex]);

  const updatePokemonNote = useCallback((name: string, note: string) => {
    setPokedex((prev) =>
      prev.map((entry) => (entry.name === name ? { ...entry, note } : entry)),
    );
  }, []);

  return (
    <PokedexContext.Provider
      value={useMemo(
        () => ({
          addPokemon,
          getPokedexCount,
          getPokemon,
          isPokemonInPokedex,
          pokedex,
          removePokemon,
          updatePokemonNote,
        }),
        [
          pokedex,
          addPokemon,
          removePokemon,
          isPokemonInPokedex,
          getPokedexCount,
          getPokemon,
          updatePokemonNote,
        ],
      )}
    >
      {children}
    </PokedexContext.Provider>
  );
};

export const usePokedex = (): PokedexContextType => {
  const context = useContext(PokedexContext);
  if (!context) {
    throw new Error("usePokedex must be used within a PokedexProvider");
  }
  return context;
};
