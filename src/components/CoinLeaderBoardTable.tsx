"use client";

import { getAllUser } from "@/api/coin/getCoin";
import { Coins } from "lucide-react";
import { useEffect, useState } from "react";
import { groupToColorMap } from "@/constant/teamColor";
import { MoneyString } from "@/types/leaderboard";
import {
  asMoneyString,
  compareMoneyStrings,
  formatMoneyString,
} from "@/utils/money";
import useAuth from "@/hooks/useAuth";

export const CoinLeaderBoardTable = () => {
  const [top10, setTop10] = useState<RankedUser[] | undefined>(undefined);
  const [myNo, setMyNo] = useState<RankedUser | undefined>(undefined);
  const { profile, status } = useAuth();

  useEffect(() => {
    if (status !== "authenticated" || !profile) return;

    const fetchData = async () => {
      const allUserResponse = (await getAllUser())?.data as
        | UserCoinResponse[]
        | undefined;
      const allUsers = (allUserResponse ?? []).map(toLeaderboardUser);

      allUsers.sort((itemA, itemB) =>
        compareMoneyStrings(itemB.remainingCoin, itemA.remainingCoin)
      );

      const myIndex = allUsers.findIndex((item) => item.id === profile.id);
      setMyNo({
        ...toLeaderboardUser(profile),
        rank: myIndex >= 0 ? myIndex + 1 : "-",
      });
      setTop10(
        allUsers.slice(0, 10).map((item, index) => ({
          ...item,
          rank: index + 1,
        }))
      );
    };

    fetchData();
  }, [profile, status]);

  return (
    <table className="rounded-lg w-[90vw] sm:w-[600px] overflow-hidden text-[0.8rem] sm:text-[1rem] h-auto">
      <thead className="bg-[#4E0F15] font-semibold h-12 flex flex-row">
        <tr className="w-full flex flex-row">
          <td className="flex items-center justify-center w-[15%] h-full">
            ลำดับ
          </td>
          <td className="flex items-center justify-start w-[45%] sm:w-[55%] h-full ">
            ชื่อ
          </td>
          <td className="flex flex-row space-x-2 items-center justify-end pr-2 sm:pr-10 w-[40%] sm:w-[30%] h-full ">
            <p>จำนวนเหรียญ</p> <Coins color="yellow" />
          </td>
        </tr>
      </thead>
      <tbody>
        {top10?.map((item) => {
          return (
            <tr
              key={item.id}
              className="text-black w-full bg-white font-semibold h-12 flex flex-row border-y-[0.5px]"
            >
              <td className="flex items-center justify-center w-[15%] h-full ">
                {item.rank}
              </td>
              <td className="flex items-center justify-start w-[55%] h-full ">
                <NameAndColor
                  name={item.nickName || ""}
                  color={
                    item.groupId == undefined
                      ? "NONE"
                      : groupToColorMap[item.groupId] ?? "NONE"
                  }
                />
              </td>
              <td className="flex flex-row space-x-2 items-center justify-end pr-10 sm:pr-20 w-[30%] h-full ">
                <p>{formatMoneyString(item.remainingCoin)}</p>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot className="font-semibold bg-neutral-200 text-black h-12 flex flex-row">
        <tr className="w-full flex flex-row">
          <td className="flex items-center justify-center w-[15%] h-full ">
            {myNo?.rank ?? "-"}
          </td>
          <td className="flex items-center justify-start w-[55%] h-full ">
            <NameAndColor
              name={myNo?.nickName || ""}
              color={
                myNo?.groupId == undefined
                  ? "NONE"
                  : groupToColorMap[myNo.groupId] ?? "NONE"
              }
            />
          </td>
          <td className="flex flex-row space-x-2 items-center justify-end pr-10 sm:pr-20 w-[30%] h-full ">
            {myNo ? formatMoneyString(myNo.remainingCoin) : "-"}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

interface UserCoinResponse {
  id: string;
  nick_name: string | null;
  group_id: string | null;
  remaining_coin: unknown;
}

interface LeaderboardUser {
  id: string;
  nickName: string | null;
  groupId: string | null;
  remainingCoin: MoneyString;
}

interface RankedUser extends LeaderboardUser {
  rank: number | "-";
}

const toLeaderboardUser = (user: UserCoinResponse): LeaderboardUser => ({
  id: user.id,
  nickName: user.nick_name,
  groupId: user.group_id,
  remainingCoin: asMoneyString(user.remaining_coin),
});

const NameAndColor = (props: { name: string; color: string }) => {
  if (props.color == "VIOLET")
    return (
      <p>
        {props.name} <span className="text-team-violet">สีม่วง </span>
      </p>
    );
  if (props.color == "BLUE")
    return (
      <p>
        {props.name} <span className="text-team-blue">สีฟ้า</span>
      </p>
    );
  if (props.color == "YELLOW")
    return (
      <p>
        {props.name} <span className="text-amber-500">สีเหลือง</span>
      </p>
    );
  if (props.color == "GREEN")
    return (
      <p>
        {props.name} <span className="text-team-green">สีเขียว</span>
      </p>
    );
  if (props.color == "PINK")
    return (
      <p>
        {props.name} <span className="text-team-pink">สีชมพู</span>
      </p>
    );
  if (props.color == "ORANGE")
    return (
      <p>
        {props.name} <span className="text-orange-600">สีส้ม</span>
      </p>
    );
  if (props.color == "NONE")
    return (
      <p>
        {props.name} <span className="text-gray-700">สี...</span>
      </p>
    );
};
