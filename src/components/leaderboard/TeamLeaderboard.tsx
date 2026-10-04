"use client";
import { useState } from "react";
import { Coins } from "lucide-react";
import { EmptyState } from "../EmptyState";
import { MatchColorLogo } from "../match/MatchColorLogo";
import { LeaderboardTabs } from "./LeaderboardTabs";
import { LeaderboardTable } from "./LeaderboardTable";
import { Podium } from "./Podium";
import {
  LeaderboardUser,
  colorOfGroup,
  formatCoin,
  teamColors,
} from "./LeaderboardUtils";

type TeamMetric = "coins" | "accuracy";

const metricTabs: { value: TeamMetric; label: string }[] = [
  { value: "coins", label: "เหรียญทีม" },
  { value: "accuracy", label: "ความแม่นยำ" },
];

const CoinIcon = () => <Coins color="yellow" className="w-4 h-4 sm:w-6 sm:h-6" />;

export const TeamLeaderboard = (props: {
  users: LeaderboardUser[] | undefined;
  me: LeaderboardUser | undefined;
}) => {
  const [metric, setMetric] = useState<TeamMetric>("coins");
  const myColor = colorOfGroup(props.me?.group_id);

  // sum every member's remaining coins per color
  const teams = teamColors
    .map((color) => ({
      color,
      coin: (props.users ?? [])
        .filter((user) => colorOfGroup(user.group_id) === color)
        .reduce((sum, user) => sum + user.remaining_coin, 0),
    }))
    .sort((a, b) => b.coin - a.coin);

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-9">
      <LeaderboardTabs
        tabs={metricTabs}
        value={metric}
        onChange={setMetric}
        variant="segmented"
      />

      {metric === "coins" ? (
        <>
          <Podium
            entries={teams.slice(0, 3).map((team) => ({
              color: team.color,
              stat: (
                <>
                  {formatCoin(team.coin)} <CoinIcon />
                </>
              ),
            }))}
          />
          <LeaderboardTable
            valueHeader={
              <>
                <p>จำนวนเหรียญ</p>
                <CoinIcon />
              </>
            }
            rows={teams.slice(3).map((team, index) => ({
              key: team.color,
              rank: index + 4,
              name: (
                <div className="flex flex-row items-center gap-1">
                  <MatchColorLogo color={team.color} />
                  {team.color === myColor && (
                    <span className="text-neutral-500 max-sm:text-xs">
                      (สีของคุณ)
                    </span>
                  )}
                </div>
              ),
              value: team.coin.toFixed(2),
              highlight: team.color === myColor,
            }))}
          />
        </>
      ) : (
        // TODO: needs a backend endpoint for per-color correct/incorrect bet counts
        <EmptyState texts={["ยังไม่มีข้อมูลความแม่นยำในขณะนี้"]} />
      )}
    </div>
  );
};
