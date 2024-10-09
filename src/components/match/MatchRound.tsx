"use client";
import { Matchbar } from "./MatchBar";
import { MatchColorLogo } from "./MatchColorLogo";
import { RoundItem } from "./MatchInterface";
import { formatTime } from "./MatchUtils";
import { useSlipStore } from "@/store/slip";

export const Round = ({ round }: { round: RoundItem }) => {
  const addSlipItem = useSlipStore((state) => state.addSlipItem)

  const handleAddToSlip = () => {
    addSlipItem({
      match_id: round.match_id,
      rate: round.rateA,
      betting_on: round.colorA, 
      date: round.time_start,
      sport_type: round.type,
      team_a_color: round.colorA,
      team_b_color: round.colorB,
    });
  };
  return (
    <div className="bg-neutral-100 flex flex-row h-16 font-semibold text-black sm:text-[1rem] text-[0.7rem]">
      <div className="w-[20%] flex items-center justify-center text-indigo-700">
        {formatTime(round.time_start)}
      </div>
      <div className="w-[60%] flex items-center justify-center space-x-2">
        <MatchColorLogo color={round.colorA} />

        {round.status === "TBA" && (
          <p className="text-gray-500 font-light text-sm">VS</p>
        )}
        {round.status === "bet" && (
          <Matchbar
            colorA={round.colorA}
            colorB={round.colorB}
            scoreA={round.scoreA}
            scoreB={round.scoreB}
          />
        )}
        {round.status === "playing" && (
          <p className="text-red-900 text-[0.7rem] sm:text-lg font-semibold">
            กำลังแข่งขัน
          </p>
        )}
        {round.status === "done" && (
          <div className="flex flex-row space-x-2">
            <p className="max-sm:text-[0.7rem] text-lg font-semibold">
              {round.scoreA}
            </p>
            <p className="max-sm:text-[0.7rem] text-lg font-semibold">-</p>
            <p className="max-sm:text-[0.7rem] text-lg font-semibold">
              {round.scoreB}
            </p>
          </div>
        )}

        <MatchColorLogo color={round.colorB} />
      </div>
      <div className="w-[20%] flex items-center justify-center max-sm:text-[0.6rem]">
        {round.status === "bet" && (
          <button 
            className="w-28 h-10 bg-neutral-200 hover:bg-neutral-400 rounded-lg flex flex-row items-center justify-center mr-1"
            onClick={handleAddToSlip}
          >
            + เพิ่มลงสลิป
          </button>
        )}
      </div>
    </div>
  );
};
