export const TypeEnum = {
  BUG: "bug",
  DARK: "dark",
  DRAGON: "dragon",
  ELECTRIC: "electric",
  FAIRY: "fairy",
  FIGHTING: "fighting",
  FIRE: "fire",
  FLYING: "flying",
  GHOST: "ghost",
  GRASS: "grass",
  GROUND: "ground",
  ICE: "ice",
  NORMAL: "normal",
  POISON: "poison",
  PSYCHIC: "psychic",
  ROCK: "rock",
  STEEL: "steel",
  STELLAR: "stellar",
  WATER: "water",
} as const;

export type TypeEnum = (typeof TypeEnum)[keyof typeof TypeEnum];
