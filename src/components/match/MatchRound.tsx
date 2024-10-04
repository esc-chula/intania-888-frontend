import { Matchbar } from "./MatchBar";
import { MatchColorLogo } from "./MatchColorLogo";

export const Round = ({
  round,
}: {
  round: {
    time: string;
    colorA: string;
    colorB: string;
    status: string;
  };
}) => {
  return (
    <div className="bg-neutral-100 flex flex-row h-16 font-semibold text-black sm:text-[1rem] text-[0.7rem]">
      <div className="w-[20%] flex items-center justify-center text-indigo-700">
        {round.time}
      </div>
      <div className="w-[60%] flex items-center justify-center space-x-2">
        <MatchColorLogo color={round.colorA} />

        {(round.colorA === "TBA" || round.colorB === "TBA") && (
          <p className="text-gray-500 font-light text-sm">VS</p>
        )}
        {round.status === "bet" && (
          <Matchbar colorA={round.colorA} colorB={round.colorB} />
        )}
        {round.status === "playing" && (
          <p className="text-red-900 text-[0.7rem] sm:text-lg font-semibold">
            กำลังแข่งขัน
          </p>
        )}
        {round.status === "done" && (
          <div className="flex flex-row space-x-2">
            <p className="max-sm:text-[0.7rem] text-lg font-semibold">24</p>
            <p className="max-sm:text-[0.7rem] text-lg font-semibold">-</p>
            <p className="max-sm:text-[0.7rem] text-lg font-semibold">13</p>
          </div>
        )}

        <MatchColorLogo color={round.colorB} />
      </div>
      <div className="w-[20%] flex items-center justify-center max-sm:text-[0.6rem]">
        {round.status === "bet" && (
          <button className="w-28 h-10 bg-neutral-200 rounded-lg flex flex-row items-center justify-center mr-1">
            + เพิ่มลงสลิป
          </button>
        )}
      </div>
    </div>
  );
};
