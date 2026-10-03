import { TeamColorId } from "@/types/leaderboard";

export const groupToColorMap: Record<string, TeamColorId> = {
  A: "YELLOW",
  B: "GREEN",
  C: "GREEN",
  DOG: "VIOLET",
  Dog: "VIOLET",
  E: "BLUE",
  F: "YELLOW",
  G: "PINK",
  H: "PINK",
  J: "VIOLET",
  K: "BLUE",
  L: "YELLOW",
  M: "GREEN",
  N: "BLUE",
  P: "ORANGE",
  Q: "ORANGE",
  R: "VIOLET",
  S: "ORANGE",
  T: "PINK",
};

export const teamColorHex: Record<TeamColorId, string> = {
  VIOLET: "#C450F5",
  BLUE: "#60B4F7",
  GREEN: "#67DF80",
  PINK: "#EC6FBF",
  ORANGE: "#EF965C",
  YELLOW: "#F9DF70",
};

export const getColorIdByGroupId = (
  groupId: string | null | undefined
): TeamColorId | null => {
  if (!groupId) return null;
  return groupToColorMap[groupId] ?? null;
};

