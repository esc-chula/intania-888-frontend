import { MapPin } from "lucide-react";
import {
  colorBgMap,
  colorDecoMap,
  leagueTextMap,
  sportTextMap,
} from "./MatchMapAndList";

export const Banner = ({
  location,
  sport,
  league,
}: {
  location: string;
  sport: string;
  league: string;
}) => {
  return (
    <div
      className="flex flex-row h-10 sm:h-14 w-full text-[0.7rem] sm:text-lg font-semibold overflow-hidden relative"
      style={{ backgroundColor: colorBgMap[league] }}
    >
      <div className="w-[30%] sm:w-[25%] flex items-center justify-start pl-2 sm:pl-4">
        {sportTextMap[sport].split(" ")[0]}
      </div>
      <div className="w-[45%] sm:w-[50%] flex items-center justify-start pl-4 flex-row space-x-1">
        <MapPin height={20} />

        <p>{location}</p>
      </div>
      <div className="w-[25%] flex items-center justify-center">
        <BannerDeco league={league} />
        <p className="z-10 absolute max-sm:pl-8">{leagueTextMap[league]}</p>
      </div>
    </div>
  );
};

const BannerDeco = (props: { league: string }) => {
  return (
    <svg
      viewBox="0 0 202 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute h-full max-sm:translate-x-9"
    >
      <g mask="url(#mask0_350_856)">
        <rect
          x="1.80371"
          y="182"
          width="200"
          height="256.107"
          rx="100"
          transform="rotate(-90 1.80371 182)"
          fill={colorDecoMap[props.league]}
        />
      </g>
    </svg>
  );
};
