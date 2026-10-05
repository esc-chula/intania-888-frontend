import { AxiosError } from "axios";
import { apiClient } from "@/api/axios";
import { mockTeamAccuracyLeaderboard } from "@/mocks/teamAccuracyLeaderboard";
import {
  TEAM_COLOR_IDS,
  TeamAccuracyRankingDto,
  TeamAccuracyRankingItem,
  TeamColorId,
} from "@/types/leaderboard";

interface ApiErrorResponse {
  code?: string;
  message?: string;
  request_id?: string;
}

export class TeamAccuracyLeaderboardError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly requestId?: string
  ) {
    super(message);
    this.name = "TeamAccuracyLeaderboardError";
  }
}

const isTeamColorId = (value: unknown): value is TeamColorId =>
  typeof value === "string" && TEAM_COLOR_IDS.includes(value as TeamColorId);

const isCount = (value: unknown): value is number =>
  Number.isSafeInteger(value) && (value as number) >= 0;

const parseRanking = (value: unknown): TeamAccuracyRankingItem => {
  if (typeof value !== "object" || value === null) {
    throw new TeamAccuracyLeaderboardError(
      "Invalid team accuracy response"
    );
  }

  const item = value as Partial<TeamAccuracyRankingDto>;

  if (
    !Number.isInteger(item.rank) ||
    (item.rank ?? 0) < 1 ||
    !isTeamColorId(item.color_id) ||
    typeof item.title !== "string" ||
    item.title.trim() === "" ||
    !isCount(item.right) ||
    !isCount(item.wrong)
  ) {
    throw new TeamAccuracyLeaderboardError(
      "Invalid team accuracy response"
    );
  }

  return {
    rank: item.rank as number,
    colorId: item.color_id,
    title: item.title,
    right: item.right,
    wrong: item.wrong,
  };
};

const parseResponse = (payload: unknown): TeamAccuracyRankingItem[] => {
  const rankings =
    typeof payload === "object" &&
    payload !== null &&
    Array.isArray((payload as { rankings?: unknown }).rankings)
      ? (payload as { rankings: unknown[] }).rankings
      : null;

  if (!rankings) {
    throw new TeamAccuracyLeaderboardError(
      "Invalid team accuracy response"
    );
  }

  return rankings.map(parseRanking);
};

export const getTeamAccuracyLeaderboard = async (): Promise<
  TeamAccuracyRankingItem[]
> => {
  const useMock =
    process.env.NEXT_PUBLIC_USE_TEAM_ACCURACY_MOCK !== "false";

  if (useMock) {
    return mockTeamAccuracyLeaderboard.map((item) => ({ ...item }));
  }

  try {
    const response = await apiClient.get<unknown>("/colors/team-accuracy");
    return parseResponse(response.data);
  } catch (error) {
    if (error instanceof TeamAccuracyLeaderboardError) throw error;

    if (error instanceof AxiosError) {
      const response = error.response?.data as ApiErrorResponse | undefined;
      throw new TeamAccuracyLeaderboardError(
        response?.message ?? "Unable to load team accuracy",
        response?.code,
        response?.request_id
      );
    }

    throw new TeamAccuracyLeaderboardError("Unable to load team accuracy");
  }
};
