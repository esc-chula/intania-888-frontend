"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { MatchColorLogo } from "../match/MatchColorLogo";
import { Selector } from "./SlipSelector";
import { formatThaiDate } from "../match/MatchUtils";
import { useSlipStore } from "@/store/slip";
import { sportTextMap } from "../match/MatchMapAndList";

interface SlipElementProps {
  date: Date;
  sportType: string;
  teamAColor: string;
  teamBColor: string;
  currentRate: number;
  matchId: string;
}

const SlipElement: React.FC<SlipElementProps> = ({
  date,
  sportType,
  teamAColor,
  teamBColor,
  currentRate,
  matchId,
}) => {
  const [selectedTeam, setSelectedTeam] = useState("เลือกทีม");
  const removeSlipItem = useSlipStore((state) => state.removeSlipItem);
  const updateSlipItem = useSlipStore((state) => state.updateSlipItem);
  const handleRemove = () => {
    removeSlipItem(matchId);
  };

  const handleUpdateBettingOn = () => {
    updateSlipItem(matchId, { betting_on: selectedTeam });
  };

  useEffect(() => {
    handleUpdateBettingOn();
  }, [selectedTeam]);

  return (
    <div className="p-1.5 max-sm:text-xs text-lg bg-white w-full">
      <div className="flex items-center justify-end">
        <X
          color="black"
          className="w-3.5 h-3.5 cursor-pointer"
          onClick={handleRemove}
        />
      </div>
      <div className="font-semibold text-neutral-700">
        {formatThaiDate(date.toString())} : {sportTextMap[sportType]}
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex justify-center items-center space-x-1.5 text-black font-semibold">
          <div>
            <MatchColorLogo color={teamAColor} size="25" />
          </div>
          <p className="font-light">vs</p>
          <div>
            <MatchColorLogo color={teamBColor} size="25" />
          </div>
        </div>
        <div className="flex justify-center items-center space-x-1.5">
          <Selector
            choicesList={[teamAColor, teamBColor]}
            mainFilter="เลือกทีม"
            filter={selectedTeam}
            setFilter={setSelectedTeam}
          />
          <p className="text-indigo-700 font-semibold">
            เรทปัจจุบัน: {currentRate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SlipElement;
