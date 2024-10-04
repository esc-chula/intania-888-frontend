import { MapPin } from "lucide-react";
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
      className="flex flex-row h-14 w-full text-sm sm:text-lg font-semibold overflow-hidden"
      style={{ backgroundColor: colorBgMap[league] }}
    >
      <div className="w-[25%] flex items-center justify-center">{sport}</div>
      <div className="w-[50%] flex items-center justify-center flex-row space-x-1">
        <MapPin />
        <p>{location}</p>
      </div>
      <div className="w-[25%] flex items-center justify-center overflow-hidden">
        <BannerDeco league={league} />
        <p className="z-10 absolute">{textMap[league]}</p>
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
      className="h-full"
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

const colorBgMap: { [key: string]: string } = {
  freshman: "#DD742C",
  senior: "#0284C7",
  all: "#4D7C0F",
};
const colorDecoMap: { [key: string]: string } = {
  freshman: "#FB923C",
  senior: "#38BDF8",
  all: "#65A30D",
};
const textMap: { [key: string]: string } = {
  freshman: "เฉพาะชั้นปีที่ี 1",
  senior: "ชั้นปีที่ 2 ถึง 4",
  all: "รวมทุกชั้นปี",
};
