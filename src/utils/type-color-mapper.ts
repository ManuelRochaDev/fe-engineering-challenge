import { TypeEnum } from "../constants/type";

export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    [TypeEnum.NORMAL]: "bg-gray-400 text-white",
    [TypeEnum.FIRE]: "bg-orange-500 text-white",
    [TypeEnum.WATER]: "bg-blue-500 text-white",
    [TypeEnum.ELECTRIC]: "bg-yellow-400 text-gray-900",
    [TypeEnum.GRASS]: "bg-green-500 text-white",
    [TypeEnum.ICE]: "bg-cyan-400 text-gray-900",
    [TypeEnum.FIGHTING]: "bg-red-700 text-white",
    [TypeEnum.POISON]: "bg-purple-500 text-white",
    [TypeEnum.GROUND]: "bg-yellow-700 text-white",
    [TypeEnum.FLYING]: "bg-indigo-400 text-white",
    [TypeEnum.PSYCHIC]: "bg-pink-500 text-white",
    [TypeEnum.BUG]: "bg-lime-500 text-white",
    [TypeEnum.ROCK]: "bg-yellow-800 text-white",
    [TypeEnum.GHOST]: "bg-purple-700 text-white",
    [TypeEnum.DRAGON]: "bg-indigo-700 text-white",
    [TypeEnum.DARK]: "bg-gray-800 text-white",
    [TypeEnum.STEEL]: "bg-gray-500 text-white",
    [TypeEnum.FAIRY]: "bg-pink-300 text-gray-900",
  };

  return typeColors[type.toLowerCase()] || "bg-gray-200 text-gray-900";
};
