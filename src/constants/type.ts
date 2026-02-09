export const TypeEnum = {
  NORMAL: "normal",
  FIGHTING: "fighting",
  FLYING: "flying",
  POISON: "poison",
  GROUND: "ground",
  ROCK: "rock",
  BUG: "bug",
  GHOST: "ghost",
  STEEL: "steel",
  FIRE: "fire",
  WATER: "water",
  GRASS: "grass",
  ELECTRIC: "electric",
  PSYCHIC: "psychic",
  ICE: "ice",
  DRAGON: "dragon",
  DARK: "dark",
  FAIRY: "fairy",
  STELLAR: "stellar",
} as const;

export type TypeEnum = (typeof TypeEnum)[keyof typeof TypeEnum];
