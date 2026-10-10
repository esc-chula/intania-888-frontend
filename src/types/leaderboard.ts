export const TEAM_COLOR_IDS = [
  "VIOLET",
  "BLUE",
  "GREEN",
  "PINK",
  "ORANGE",
  "YELLOW",
] as const;

export type TeamColorId = (typeof TEAM_COLOR_IDS)[number];

export type MoneyString = string & { readonly __money: unique symbol };

export interface TeamCoinRankingDto {
  rank: number;
  id: TeamColorId;
  title: string;
  total_coin: MoneyString;
}

export type TeamCoinLeaderboardResponse = TeamCoinRankingDto[];

export interface TeamCoinRankingItem {
  rank: number;
  colorId: TeamColorId;
  title: string;
  teamCoins: MoneyString;
}

export interface TeamCoinViewItem {
  rank: number;
  colorId: TeamColorId;
  title: string;
  teamCoinsText: string;
  isCurrentTeam: boolean;
}

export interface TeamAccuracyRankingItem {
  rank: number;
  colorId: TeamColorId;
  title: string;
  right: number;
  wrong: number;
}

export interface TeamAccuracyRankingDto {
  rank: number;
  id: TeamColorId;
  title: string;
  correct: number;
  wrong: number;
}

export type TeamAccuracyLeaderboardResponse = TeamAccuracyRankingDto[];

export interface TeamAccuracyViewItem extends TeamAccuracyRankingItem {
  isCurrentTeam: boolean;
}

export type LeaderboardMetric = "coins" | "accuracy";
