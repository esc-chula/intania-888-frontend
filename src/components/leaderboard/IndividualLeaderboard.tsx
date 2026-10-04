import { Coins } from "lucide-react";
import { LeaderboardRow, LeaderboardTable } from "./LeaderboardTable";
import { LeaderboardUser, NameWithColor, colorOfGroup } from "./LeaderboardUtils";

export const IndividualLeaderboard = (props: {
  users: LeaderboardUser[] | undefined;
  me: LeaderboardUser | undefined;
}) => {
  const sorted = [...(props.users ?? [])].sort(
    (a, b) => b.remaining_coin - a.remaining_coin
  );

  const toRow = (user: LeaderboardUser, rank: number): LeaderboardRow => ({
    key: user.id,
    rank,
    name: (
      <NameWithColor
        name={user.nick_name}
        color={colorOfGroup(user.group_id)}
        isMe={user.id === props.me?.id}
      />
    ),
    value: user.remaining_coin.toFixed(2),
  });

  const myIndex = sorted.findIndex((user) => user.id === props.me?.id);

  return (
    <LeaderboardTable
      valueHeader={
        <>
          <p>จำนวนเหรียญ</p>
          <Coins color="yellow" className="w-4 h-4 sm:w-6 sm:h-6" />
        </>
      }
      rows={sorted.slice(0, 10).map((user, index) => toRow(user, index + 1))}
      footer={props.me && toRow(props.me, myIndex + 1)}
    />
  );
};
