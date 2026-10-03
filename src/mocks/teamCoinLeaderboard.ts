import {
  MoneyString,
  TeamCoinLeaderboardResponse,
} from "@/types/leaderboard";

const money = (value: string) => value as MoneyString;

export const mockTeamCoinLeaderboard: TeamCoinLeaderboardResponse = {
  rankings: [
    {
      rank: 1,
      color_id: "VIOLET",
      title: "สีม่วง",
      team_coins: money("100000.00"),
    },
    {
      rank: 2,
      color_id: "BLUE",
      title: "สีฟ้า",
      team_coins: money("90000.00"),
    },
    {
      rank: 3,
      color_id: "GREEN",
      title: "สีเขียว",
      team_coins: money("85000.00"),
    },
    {
      rank: 4,
      color_id: "ORANGE",
      title: "สีส้ม",
      team_coins: money("80000.00"),
    },
    {
      rank: 5,
      color_id: "YELLOW",
      title: "สีเหลือง",
      team_coins: money("76543.21"),
    },
    {
      rank: 6,
      color_id: "PINK",
      title: "สีชมพู",
      team_coins: money("60000.00"),
    },
  ],
};

