"use client";
import React from "react";
import { MatchColorLogo } from "../match/MatchColorLogo";
import { formatThaiDate } from "../match/MatchUtils";
import { sportTextMap } from "../match/MatchMapAndList";

export interface SlipResultProps extends React.ComponentProps<"div"> {
  match: {
    team_a: string;
    team_b: string;
    type: string;
    start_time: string;
  };
  rate: number;
  betting_on: string;
}

const SlipResult: React.FC<SlipResultProps> = ({
  match,
  rate,
  betting_on,
  className,
}) => {
  return (
    <div className={`${className} p-3 max-sm:text-xs text-lg bg-white w-full`}>
      <div className="font-semibold text-neutral-700">
        {formatThaiDate(new Date(new Date(match.start_time).getTime() - (24 * 60 * 60 * 1000)).toISOString())}: {sportTextMap[match.type]}
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex justify-center items-center space-x-1.5 text-black font-semibold">
          <div>
            <MatchColorLogo color={match.team_a} size="25" />
          </div>
          <p className="font-light">vs</p>
          <div>
            <MatchColorLogo color={match.team_b} size="25" />
          </div>
        </div>
        <div className="flex justify-center items-center space-x-1.5">
          <p className="text-indigo-700 font-semibold">เรทที่ได้: {rate}</p>
          <p className="text-indigo-700 font-semibold">
            ฝั่งที่ทาย: {betting_on}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SlipResult;
