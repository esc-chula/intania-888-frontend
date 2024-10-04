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
