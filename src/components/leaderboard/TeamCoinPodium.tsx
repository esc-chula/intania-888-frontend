import { Coins, Crown } from "lucide-react";
import { TeamCoinDisplayProps } from "@/types/leaderboard";
import { TeamShirtIcon } from "./TeamShirtIcon";

const podiumConfig = {
  1: {
    height: "h-28 sm:h-32",
    background: "bg-[#FFBD3C]",
  },
  2: {
    height: "h-20 sm:h-24",
    background: "bg-[#D9D9D9]",
  },
  3: {
    height: "h-16 sm:h-20",
    background: "bg-[#FF8848]",
  },
} as const;

export const TeamCoinPodium = ({ items }: TeamCoinDisplayProps) => {
  const slots = [2, 1, 3] as const;

  return (
    <section className="w-full max-w-md" aria-label="สามอันดับแรก">
      <div className="flex items-end justify-center px-2">
        {slots.map((rank) => {
          const item = items.find((candidate) => candidate.rank === rank);
          if (!item) return <div key={rank} className="w-1/3" />;

          const config = podiumConfig[rank];

          return (
            <div key={rank} className="flex w-1/3 flex-col items-center">
              <div className="flex min-h-36 flex-col items-center justify-end pb-2 text-center sm:min-h-40">
                {rank === 1 && (
                  <Crown
                    className="mb-1 h-7 w-7 fill-[#FFBD3C] text-[#FFBD3C]"
                    aria-label="อันดับหนึ่ง"
                  />
                )}
                <TeamShirtIcon
                  colorId={item.colorId}
                  className="h-10 w-10 sm:h-12 sm:w-12"
                />
                <p className="mt-1 text-sm font-semibold sm:text-base">
                  {item.title}
                </p>
                {item.isCurrentTeam && (
                  <p className="text-[10px] text-neutral-400 sm:text-xs">
                    (สีของคุณ)
                  </p>
                )}
                <div className="mt-1 flex items-center gap-1 rounded-full bg-neutral-800 px-2 py-1 text-[10px] text-white sm:text-xs">
                  <span>{item.teamCoinsText}</span>
                  <Coins className="h-3 w-3 text-[#D6A928]" />
                </div>
              </div>
              <div
                className={`${config.height} ${config.background} flex w-full items-center justify-center rounded-t-lg border-t-8 border-neutral-300 text-4xl font-semibold text-white sm:text-5xl`}
              >
                {rank}
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-4 w-full bg-[#651018]" />
    </section>
  );
};

