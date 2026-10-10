import { TeamAccuracyRankingDto } from "@/types/leaderboard";

// Ranked by correct predictions to match the backend response order.
export const mockTeamAccuracyLeaderboard = [
  {
    rank: 1,
    id: "VIOLET",
    title: "สีม่วง",
    correct: 128,
    wrong: 42,
  },
  {
    rank: 2,
    id: "BLUE",
    title: "สีฟ้า",
    correct: 116,
    wrong: 38,
  },
  {
    rank: 3,
    id: "GREEN",
    title: "สีเขียว",
    correct: 103,
    wrong: 51,
  },
  {
    rank: 4,
    id: "ORANGE",
    title: "สีส้ม",
    correct: 97,
    wrong: 44,
  },
  {
    rank: 5,
    id: "YELLOW",
    title: "สีเหลือง",
    correct: 84,
    wrong: 49,
  },
  {
    rank: 6,
    id: "PINK",
    title: "สีชมพู",
    correct: 76,
    wrong: 55,
  },
] as const satisfies readonly TeamAccuracyRankingDto[];
