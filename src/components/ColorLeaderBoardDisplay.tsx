import { getColorLeaderboard } from "@/api/match/getColorLeaderboard";
import { useEffect, useState } from "react";
import { LeaderBoardTable } from "./ColorLeaderBoardTable";
import { leaderboardDataInterface } from "./ColorLeaderBoardUtils";

export const LeaderBoardTableDisplay = (props: {
  sport: string;
  dateNow: Date;
}) => {
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

    setLastUpdate(
      `${props.dateNow.getDate()}/${props.dateNow.getMonth()}/${
        props.dateNow.getFullYear() + 543
      } ${props.dateNow.getHours()}:${props.dateNow.getMinutes()}`
    );
  }, [props.sport, props.dateNow]);

  const teamA = ["YELLOW", "BLUE", "VIOLET"];
  const teamB = ["PINK", "ORANGE", "GREEN"];

  return (
    <>
      <p className="text-sm text-neutral-500">Update : {lastUpdate}</p>
      <LeaderBoardTable
        data={undefined}
        varience={props.sport === "" ? "123" : "WDL"}
      />

      {props.sport != "" && (
        <div className="w-full flex flex-col space-y-8 items-center justify-center py-4">
          <h2 className="max-sm:text-2xl text-3xl font-semibold text-white">
            รอบแบ่งกลุ่ม
          </h2>
          <div className="w-[90vw] sm:w-[600px] flex flex-col items-start justify-start space-y-4">
            <p className="font-semibold">กลุ่ม A</p>
            {data != undefined && (
              <LeaderBoardTable
                data={data.filter((item) => teamA.includes(item.id))}
                varience="WDL"
              />
            )}
          </div>
          <div className="w-[90vw] sm:w-[600px] flex flex-col items-start justify-start space-y-4">
            <p className="font-semibold">กลุ่ม B</p>
            {data != undefined && (
              <LeaderBoardTable
                data={data.filter((item) => teamB.includes(item.id))}
                varience="WDL"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
