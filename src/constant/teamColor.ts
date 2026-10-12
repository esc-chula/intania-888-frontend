import { TeamColorId } from "@/types/leaderboard";

export const groupToColorMap: Record<string, TeamColorId> = {
  A: "PINK",
  B: "GREEN",
  C: "RED",
  DOG: "VIOLET",
  Dog: "VIOLET",
  E: "ORANGE",
  F: "BLUE",
  G: "PINK",
  H: "RED",
  J: "VIOLET",
  K: "BLUE",
  L: "ORANGE",
  M: "ORANGE",
  N: "PINK",
  P: "GREEN",
  Q: "RED",
  R: "BLUE",
  S: "GREEN",
  T: "VIOLET",
};

export const teamColorHex: Record<TeamColorId, string> = {
  VIOLET: "#C450F5",
  BLUE: "#60B4F7",
  GREEN: "#67DF80",
  PINK: "#EC6FBF",
  ORANGE: "#EF965C",
  RED: "#EF4444",
};

export const getColorIdByGroupId = (
  groupId: string | null | undefined
): TeamColorId | null => {
  if (!groupId) return null;
  return groupToColorMap[groupId] ?? null;
};

