import type { PokedexEntry } from "../services/pokedex-service";

export const sharePokemon = async (
  pokemonName: string,
  pokedexEntry?: PokedexEntry,
) => {
  const url = `${globalThis.location.origin}/pokemon/${pokemonName}`;
  const capitalizedName =
    pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

  let text = `Still looking for a ${capitalizedName}!\n${url}`;

  if (pokedexEntry) {
    const caughtDate = new Date(pokedexEntry.timestamp).toLocaleDateString();
    text = `I caught ${capitalizedName} on ${caughtDate}!\n`;
    text += url;
  }

  try {
    if (navigator.share) {
      await navigator.share({ text });
      return;
    }
  } catch {}

  await navigator.clipboard?.writeText(text);
};
