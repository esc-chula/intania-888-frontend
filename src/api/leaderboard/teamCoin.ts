import { AxiosError } from "axios";
import { apiClient } from "@/api/axios";
import { mockTeamCoinLeaderboard } from "@/mocks/teamCoinLeaderboard";
import {
  TEAM_COLOR_IDS,
  TeamCoinRankingDto,
  TeamCoinRankingItem,
  TeamColorId,
} from "@/types/leaderboard";
import { asMoneyString } from "@/utils/money";

interface ApiErrorResponse {
  code?: string;
  message?: string;
  request_id?: string;
}

export class TeamCoinLeaderboardError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly requestId?: string
  ) {
    super(message);
    this.name = "TeamCoinLeaderboardError";
  }
}

const isTeamColorId = (value: unknown): value is TeamColorId =>
  typeof value === "string" &&
  TEAM_COLOR_IDS.includes(value as TeamColorId);

const parseRanking = (value: unknown): TeamCoinRankingItem => {
  if (typeof value !== "object" || value === null) {
    throw new TeamCoinLeaderboardError("Invalid team leaderboard response");
  }

  const item = value as Partial<TeamCoinRankingDto>;

  if (
    !Number.isInteger(item.rank) ||
    (item.rank ?? 0) < 1 ||
    !isTeamColorId(item.color_id) ||
    typeof item.title !== "string" ||
    item.title.trim() === ""
  ) {
    throw new TeamCoinLeaderboardError("Invalid team leaderboard response");
  }

  return {
    rank: item.rank as number,
    colorId: item.color_id,
    title: item.title,
    teamCoins: asMoneyString(item.team_coins),
  };
};

const parseResponse = (payload: unknown): TeamCoinRankingItem[] => {
  const rankings = Array.isArray(payload)
    ? payload
    : typeof payload === "object" &&
        payload !== null &&
        Array.isArray((payload as { rankings?: unknown }).rankings)
      ? (payload as { rankings: unknown[] }).rankings
      : null;

  if (!rankings) {
    throw new TeamCoinLeaderboardError("Invalid team leaderboard response");
  }

  return rankings.map(parseRanking);
};

const cloneMockResponse = (): TeamCoinRankingItem[] =>
  mockTeamCoinLeaderboard.rankings.map((item) => ({
    rank: item.rank,
    colorId: item.color_id,
    title: item.title,
    teamCoins: item.team_coins,
  }));

export const getTeamCoinLeaderboard = async (): Promise<
  TeamCoinRankingItem[]
> => {
  const useMock =
    process.env.NEXT_PUBLIC_USE_TEAM_LEADERBOARD_MOCK !== "false";

  if (useMock) {
    return cloneMockResponse();
  }

  try {
    const response = await apiClient.get<unknown>("/colors/team-coins");
    return parseResponse(response.data);
  } catch (error) {
    if (error instanceof TeamCoinLeaderboardError) throw error;

    if (error instanceof AxiosError) {
      const response = error.response?.data as ApiErrorResponse | undefined;
      throw new TeamCoinLeaderboardError(
        response?.message ?? "Unable to load the team leaderboard",
        response?.code,
        response?.request_id
      );
    }

    throw new TeamCoinLeaderboardError(
      "Unable to load the team leaderboard"
    );
  }
};

