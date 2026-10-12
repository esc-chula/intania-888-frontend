import { ReactNode } from "react";
import { Crown } from "lucide-react";
import { Shirt, colorMap } from "../match/MatchColorLogo";

export interface PodiumEntry {
  place: 1 | 2 | 3;
  color: string;
  name?: ReactNode;
  subtitle?: ReactNode;
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

const PodiumStep = ({ entry }: { entry: PodiumEntry }) => {
  const style = stepStyle[entry.place];
  const color = entry.color ?? "TBA";

  return (
    <div className="flex w-[120px] shrink-0 flex-col items-center gap-3 sm:w-[184px] sm:gap-5">
      <div className="flex min-w-0 flex-col items-center gap-1 sm:gap-2">
        <div className="relative">
          <Shirt color={color} className="h-14 sm:h-[100px]" />
          {entry.place === 1 && (
            <Crown
              className="absolute -right-4 -top-5 h-7 w-7 rotate-[22.77deg] text-amber-400 sm:-right-7 sm:-top-9 sm:h-12 sm:w-12"
              fill="currentColor"
              stroke="#A2790D"
            />
          )}
        </div>
        <p className="max-w-full truncate text-lg font-semibold text-white sm:text-[28px] sm:leading-[48px]">
          {entry.name ?? colorMap[color].name}
        </p>
        {entry.subtitle}
        <div className="flex flex-row items-center gap-1 whitespace-nowrap rounded-full bg-white/20 px-2 py-1 text-[0.65rem] font-semibold text-white sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xl">
          {entry.stat}
        </div>
      </div>
      <div
        className={`relative w-full ${style.height} ${style.back} rounded-t-2xl sm:rounded-t-3xl overflow-hidden`}
      >
        <div
          className={`absolute inset-x-0 bottom-0 ${style.offset} ${style.front} rounded-t-2xl sm:rounded-t-3xl flex items-center justify-center`}
        >
          <span className="text-5xl sm:text-8xl font-semibold text-white">
            {entry.place}
          </span>
        </div>
      </div>
    </div>
  );
};

export const Podium = (props: { entries: PodiumEntry[] }) => {
  const visibleEntries = ([2, 1, 3] as const).flatMap((place) =>
    props.entries.filter((entry) => entry.place === place),
  );

  return (
    <div className="flex max-w-[90vw] flex-col items-center overflow-x-auto pt-6 sm:pt-10">
      <div className="flex min-w-max flex-row items-end justify-center gap-2 px-1 sm:gap-5">
        {visibleEntries.map((entry) => (
          <PodiumStep key={`${entry.place}-${entry.color}`} entry={entry} />
        ))}
      </div>
      <div className="h-5 w-full min-w-full bg-[#4E0F15] sm:h-8" />
    </div>
  );
};
