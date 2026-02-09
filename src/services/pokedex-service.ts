const POKEDEX_KEY = 'pokedex';

export interface PokedexEntry {
  name: string;
  timestamp: number;
  note?: string;
}

export const addPokemon = (name: string, note?: string): PokedexEntry[] => {
  const existingPokedex = getPokedex();
  
  if (existingPokedex.some(entry => entry.name === name)) {
    return existingPokedex;
  }
  
  const newEntry: PokedexEntry = {
    name,
    timestamp: Date.now(),
    ...(note && { note }),
  };
  
  const updatedPokedex = [...existingPokedex, newEntry];
  localStorage.setItem(POKEDEX_KEY, JSON.stringify(updatedPokedex));
  
  return updatedPokedex;
};

export const getPokedex = (): PokedexEntry[] => {
  const stored = localStorage.getItem(POKEDEX_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const removePokemon = (name: string): PokedexEntry[] => {
  const existingPokedex = getPokedex();
  const updatedPokedex = existingPokedex.filter(entry => entry.name !== name);
  localStorage.setItem(POKEDEX_KEY, JSON.stringify(updatedPokedex));
  
  return updatedPokedex;
};

export const isPokemonInPokedex = (name: string): boolean => {
  return getPokedex().some(entry => entry.name === name);
};

export const getPokedexCount = (): number => {
  return getPokedex().length;
};