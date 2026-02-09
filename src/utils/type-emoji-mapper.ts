import { TypeEnum } from "../constants/type";

export const getEmojiForType = (type: string): string => {
  const typeMap: Record<string, string> = {
    [TypeEnum.NORMAL]: "⚪",
    [TypeEnum.FIRE]: "🔥",
    [TypeEnum.WATER]: "💧",
    [TypeEnum.ELECTRIC]: "⚡",
    [TypeEnum.GRASS]: "🌿",
    [TypeEnum.ICE]: "❄️",
    [TypeEnum.FIGHTING]: "🥊",
    [TypeEnum.POISON]: "☠️",
    [TypeEnum.GROUND]: "🌍",
    [TypeEnum.FLYING]: "🦅",
    [TypeEnum.PSYCHIC]: "🔮",
    [TypeEnum.BUG]: "🐛",
    [TypeEnum.ROCK]: "🪨",
    [TypeEnum.GHOST]: "👻",
    [TypeEnum.DRAGON]: "🐉",
    [TypeEnum.DARK]: "🌑",
    [TypeEnum.STEEL]: "⚙️",
    [TypeEnum.FAIRY]: "🧚",
  };

  return typeMap[type.toLowerCase()] || "❓";
};
