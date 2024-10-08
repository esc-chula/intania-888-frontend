import { getColorLeaderboard } from "@/api/match/getColorLeaderboard";
import { useEffect, useState } from "react";
import { LeaderBoardTable } from "./ColorLeaderBoardTable";
import { leaderboardDataInterface } from "./ColorLeaderBoardUtils";

export const LeaderBoardTableDisplay = (props: { sport: string }) => {
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
      {data != undefined && (
        <LeaderBoardTable
          data={data}
          varience={props.sport === "" ? "123" : "WDL"}
        />
      )}
      {data != undefined && (
        <LeaderBoardTable
          data={undefined}
          varience={props.sport === "" ? "123" : "WDL"}
        />
      )}

      {props.sport != "" && (
        <div className="w-full flex flex-col space-y-8 items-center justify-center py-4">
          <h2 className="max-sm:text-2xl text-3xl font-semibold text-white">
            รอบแบ่งกลุ่ม
          </h2>
          <div className="w-[90vw] sm:w-[600px] flex flex-col items-start justify-start space-y-4">
            <p className="font-semibold">กลุ่ม A</p>
            {data != undefined && (
              <LeaderBoardTable data={data.slice(0, 3)} varience="WDL" />
            )}
          </div>
          <div className="w-[90vw] sm:w-[600px] flex flex-col items-start justify-start space-y-4">
            <p className="font-semibold">กลุ่ม B</p>
            {data != undefined && (
              <LeaderBoardTable data={data.slice(3, 7)} varience="WDL" />
            )}
          </div>
        </div>
      )}
    </>
  );
};
