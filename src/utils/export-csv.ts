import type { PokemonWithDetails } from "../interfaces/PokemonWithDetails";
import type { PokedexEntry } from "../services/pokedex-service";
import { timestampToDate } from "./timestamp-to-date";

export const exportPokedexToCSV = (
  pokedex: PokedexEntry[],
  pokemonWithDetails: PokemonWithDetails[]
) => {
  // CSV Header
  const headers = ["Name", "Caught Date", "Height (cm)", "Weight (kg)", "Types", "Note"];
  
  // CSV Rows
  const rows = pokedex.map((entry) => {
    const found = pokemonWithDetails.find((p) => p.pokemon.name === entry.name);
    const details = found?.details;
    
    return [
      entry.name,
      timestampToDate(entry.timestamp),
      details ? (details.height * 10).toString() : "",
      details ? (details.weight * 0.1).toFixed(2) : "",
      details ? details.types.map((t) => t.type.name).join("; ") : "",
      entry.note || "",
    ];
  });

  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")
    ),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.href = url;
  link.download = `pokedex_${new Date().toISOString().split("T")[0]}.csv`;
  
  document.body.appendChild(link);
  link.click();
  link.remove();
  
  // Clean up the URL object
  URL.revokeObjectURL(url);
};
