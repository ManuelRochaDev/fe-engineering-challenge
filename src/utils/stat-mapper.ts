export const getStatDisplayName = (statName: string): string => {
  const statMap: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Special Attack",
    "special-defense": "Special Defense",
    speed: "Speed",
  };

  return statMap[statName.toLowerCase()] || statName;
};
