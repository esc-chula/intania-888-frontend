import { getColorLeaderboard } from "@/api/match/getColorLeaderboard";
import { useEffect, useState } from "react";
import { LeaderBoardTable } from "./ColorLeaderBoardTable";
import { leaderboardDataInterface, sortLeaderboardDataByWon } from "./ColorLeaderBoardUtils";

export const LeaderBoardTableDisplay = (props: {
  sport: string;
  teamA: leaderboardDataInterface[] | undefined;
  teamB: leaderboardDataInterface[] | undefined;
}) => {
  const [data, setData] = useState<leaderboardDataInterface[] | undefined>(
    undefined
  );
  const [lastUpdate, setLastUpdate] = useState("");
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setData(undefined);
      setLoadError(false);
      const res = await getColorLeaderboard({
        type_id: props.sport || undefined,
      });
      if (cancelled) return;

      if (!res.success) {
        setData([]);
        setLoadError(true);
        return;
      }

      setData(sortLeaderboardDataByWon(res.data));
      const updatedAt = new Date();
      setLastUpdate(
        `${updatedAt.getDate()}/${updatedAt.getMonth() + 1}/${
          updatedAt.getFullYear() + 543
        } ${updatedAt.getHours()}:${updatedAt
          .getMinutes()
          .toString()
          .padStart(2, "0")}`,
      );
    };

    void fetchData();

    return () => {
      cancelled = true;
    };
  }, [props.sport]);

  return (
    <>
      <p className="text-sm text-neutral-500">Update : {lastUpdate}</p>
      {loadError && (
        <p className="text-sm text-red-400" role="alert">
          ไม่สามารถโหลดตารางอันดับสีได้ กรุณาลองใหม่อีกครั้ง
        </p>
      )}
      <LeaderBoardTable
        data={data}
        varience={"WDL"}
      />

      {props.sport != "" && (
        <div className="w-full flex flex-col space-y-8 items-center justify-center py-4">
          <h2 className="max-sm:text-2xl text-3xl font-semibold text-white">
            รอบแบ่งกลุ่ม
          </h2>
          <div className="w-[90vw] sm:w-[600px] flex flex-col items-start justify-start space-y-4">
            <p className="font-semibold">กลุ่ม A</p>
            {data != undefined && (
              <LeaderBoardTable data={sortLeaderboardDataByWon(props.teamA || [])} varience="WDL" />
            )}
          </div>
          <div className="w-[90vw] sm:w-[600px] flex flex-col items-start justify-start space-y-4">
            <p className="font-semibold">กลุ่ม B</p>
            {data != undefined && (
              <LeaderBoardTable data={sortLeaderboardDataByWon(props.teamB || [])} varience="WDL" />
            )}
          </div>
        </div>
      )}
    </>
  );
};
