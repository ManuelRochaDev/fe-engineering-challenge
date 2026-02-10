export const getStatDisplayName = (statName: string): string => {
  const statMap: Record<string, string> = {
    attack: "Attack",
    defense: "Defense",
    hp: "HP",
    "special-attack": "Special Attack",
    "special-defense": "Special Defense",
    speed: "Speed",
  };

  return statMap[statName.toLowerCase()] || statName;
};
