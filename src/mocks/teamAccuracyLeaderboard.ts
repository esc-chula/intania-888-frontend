import { TeamAccuracyRankingItem } from "@/types/leaderboard";

// Ranked by Right descending to match the proposed backend response order.
export const mockTeamAccuracyLeaderboard = [
  {
    rank: 1,
    colorId: "VIOLET",
    title: "สีม่วง",
    right: 128,
    wrong: 42,
  },
  {
    rank: 2,
    colorId: "BLUE",
    title: "สีฟ้า",
    right: 116,
    wrong: 38,
  },
  {
    rank: 3,
    colorId: "GREEN",
    title: "สีเขียว",
    right: 103,
    wrong: 51,
  },
  {
    rank: 4,
    colorId: "ORANGE",
    title: "สีส้ม",
    right: 97,
    wrong: 44,
  },
  {
    rank: 5,
    colorId: "YELLOW",
    title: "สีเหลือง",
    right: 84,
    wrong: 49,
  },
  {
    rank: 6,
    colorId: "PINK",
    title: "สีชมพู",
    right: 76,
    wrong: 55,
  },
] as const satisfies readonly TeamAccuracyRankingItem[];
