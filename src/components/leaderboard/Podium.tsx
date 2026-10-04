import { ReactNode } from "react";
import { Crown } from "lucide-react";
import { Shirt, colorMap } from "../match/MatchColorLogo";

export interface PodiumEntry {
  color: string;
  stat: ReactNode;
}

// Each step is a darker back block with a lighter front block offset below it.
const stepStyle: {
  [place: number]: { back: string; front: string; height: string; offset: string };
} = {
  1: {
    back: "bg-base-gold",
    front: "bg-amber-400",
    height: "h-[150px] sm:h-[247px]",
    offset: "top-[14px] sm:top-[24px]",
  },
  2: {
    back: "bg-neutral-400",
    front: "bg-neutral-300",
    height: "h-[122px] sm:h-[201px]",
    offset: "top-[12px] sm:top-[20px]",
  },
  3: {
    back: "bg-orange-500",
    front: "bg-orange-400",
    height: "h-[106px] sm:h-[174px]",
    offset: "top-[10px] sm:top-[17px]",
  },
};

const PodiumStep = (props: { place: number; entry?: PodiumEntry }) => {
  const style = stepStyle[props.place];
  const color = props.entry?.color ?? "TBA";

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-5 w-[30%] sm:w-[184px]">
      <div className="flex flex-col items-center gap-1 sm:gap-2">
        <div className="relative">
          <Shirt color={color} className="h-14 sm:h-[100px]" />
          {props.place === 1 && (
            <Crown
              className="absolute -top-5 -right-4 sm:-top-9 sm:-right-7 w-7 h-7 sm:w-12 sm:h-12 rotate-[22.77deg] text-amber-400"
              fill="currentColor"
              stroke="#A2790D"
            />
          )}
        </div>
        <p className="text-lg sm:text-[28px] sm:leading-[48px] font-semibold text-white">
          {colorMap[color].name}
        </p>
        <div className="flex flex-row items-center gap-1 sm:gap-2 bg-white/20 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 text-[0.65rem] sm:text-xl font-semibold text-white whitespace-nowrap">
          {props.entry?.stat ?? "-"}
        </div>
      </div>
      <div
        className={`relative w-full ${style.height} ${style.back} rounded-t-2xl sm:rounded-t-3xl overflow-hidden`}
      >
        <div
          className={`absolute inset-x-0 bottom-0 ${style.offset} ${style.front} rounded-t-2xl sm:rounded-t-3xl flex items-center justify-center`}
        >
          <span className="text-5xl sm:text-8xl font-semibold text-white">
            {props.place}
          </span>
        </div>
      </div>
    </div>
  );
};

// entries are ordered by rank: [1st, 2nd, 3rd]
export const Podium = (props: { entries: PodiumEntry[] }) => {
  return (
    <div className="flex flex-col items-center w-[90vw] sm:w-[700px]">
      <div className="flex flex-row items-end justify-center gap-2 sm:gap-5 w-full">
        <PodiumStep place={2} entry={props.entries[1]} />
        <PodiumStep place={1} entry={props.entries[0]} />
        <PodiumStep place={3} entry={props.entries[2]} />
      </div>
      <div className="bg-[#4E0F15] h-5 sm:h-8 w-full" />
    </div>
  );
};
