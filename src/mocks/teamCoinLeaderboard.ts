import {
  MoneyString,
  TeamCoinLeaderboardResponse,
} from "@/types/leaderboard";

const money = (value: string) => value as MoneyString;

export const mockTeamCoinLeaderboard: TeamCoinLeaderboardResponse = [
    {
      rank: 1,
      id: "VIOLET",
      title: "สีม่วง",
      total_coin: money("100000.00"),
    },
    {
      rank: 2,
      id: "BLUE",
      title: "สีฟ้า",
      total_coin: money("90000.00"),
    },
    {
      rank: 3,
      id: "GREEN",
      title: "สีเขียว",
      total_coin: money("85000.00"),
    },
    {
      rank: 4,
      id: "ORANGE",
      title: "สีส้ม",
      total_coin: money("80000.00"),
    },
    {
      rank: 5,
      id: "YELLOW",
      title: "สีเหลือง",
      total_coin: money("76543.21"),
    },
    {
      rank: 6,
      id: "PINK",
      title: "สีชมพู",
      total_coin: money("60000.00"),
    },
];

