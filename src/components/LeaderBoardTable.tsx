import { getColorLeaderboard } from "@/api/match/getColorLeaderboard";
import { useEffect, useState } from "react";
import { MatchColorLogo } from "./match/MatchColorLogo";

export const LeaderBoardTable = (props: { sport: string }) => {
  const [data, setData] = useState<leaderboardDataInterface[] | undefined>(
    undefined
  );
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await getColorLeaderboard({
        type_id: props.sport,
      });
      return res?.data;
    };

    const fetchData = async () => {
      const data = await getData();
      setData(data);
    };

    fetchData();

    const time = new Date(Date.now());

    setLastUpdate(
      `${time.getDate()}/${time.getMonth()}/${
        time.getFullYear() + 543
      } ${time.getHours()}:${time.getMinutes()}`
    );
  }, [props.sport]);

  console.log(data);

  return (
    <>
      <p className="text-sm text-neutral-500">Update : {lastUpdate}</p>
      <table className="rounded-lg w-[90vw] sm:w-[600px] overflow-hidden text-[0.8rem] sm:text-[1rem] h-auto">
        <thead className="bg-[#4E0F15] font-semibold h-12 flex flex-row">
          <tr className="w-full flex flex-row">
            <td className="flex items-center justify-center w-[15%] h-full">
              ลำดับ
            </td>
            <td className="flex items-center justify-start w-[20%] h-full ">
              สี
            </td>
            <td className="flex items-center justify-start w-[20%] h-full ">
              กรุ๊ป
            </td>
            <td className="flex flex-row space-x-2 items-center justify-center w-[15%] h-full max-sm:text-[0.7rem]">
              1st 🏆
            </td>
            <td className="flex flex-row space-x-2 items-center justify-center w-[15%] h-full  max-sm:text-[0.7rem]">
              2nd 🥈
            </td>
            <td className="flex flex-row space-x-2 items-center justify-center w-[15%] h-full max-sm:text-[0.7rem]">
              3-4th 🥉
            </td>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            return (
              <tr
                key={index}
                className="text-black w-full bg-white font-semibold h-16 flex flex-row border-y-[0.5px]"
              >
                <td className="flex items-center justify-center w-[15%] h-full ">
                  {index + 1}
                </td>
                <td className="flex items-center justify-start w-[20%] h-full ">
                  <MatchColorLogo color={item.id} />
                </td>
                <td className="flex items-center justify-start w-[20%] h-full ">
                  {groupColor[item.id]}
                </td>
                <td className="flex flex-row space-x-2 items-center justify-center w-[15%] h-full ">
                  {item.won}
                </td>
                <td className="flex flex-row space-x-2 items-center justify-center w-[15%] h-full ">
                  {item.drawn}
                </td>
                <td className="flex flex-row space-x-2 items-center justify-center w-[15%] h-full ">
                  {item.lost}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

interface leaderboardDataInterface {
  id: string;
  title: string;
  won: number;
  drawn: number;
  lost: number;
  total_matches: number;
}

const groupColor: { [key: string]: string } = {
  PINK: "[E,L,P]",
  ORANGE: "[J,K,M]",
  GREEN: "[H,S,T]",
  BLUE: "[Dog,N,R]",
  VIOLET: "[A,C,F]",
  YELLOW: "[B,G,Q]",
};
