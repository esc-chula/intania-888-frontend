import { colorMap } from "./MatchColorLogo";
import { RateString } from "@/types/decimal";
import { getRatePercentages } from "@/utils/rate";
export const Matchbar = (props: {
  colorA: string;
  colorB: string;
  rateA: RateString;
  rateB: RateString;
}) => {
  const [scoreA, scoreB] = getRatePercentages(props.rateA, props.rateB);

  return (
    <div className="flex flex-col space-y-0  text-[0.55rem] sm:text-[0.8rem] sm:px-4">
      <div className="flex flex-row justify-between items-center">
        <p>{scoreA}%</p>
        <p>{scoreB}%</p>
      </div>
      <div className="h-3 w-full rounded-lg border-neutral-900 border-[2.5px] relative overflow-hidden">
        <div
          className="h-full border-r-[2.5px] border-neutral-900 absolute"
          style={{
            backgroundColor: colorMap[props.colorA].color,
            width: `${scoreA}%`,
          }}
        ></div>
        <div
          className="h-full absolute right-0"
          style={{
            backgroundColor: colorMap[props.colorB].color,
            width: `${scoreB}%`,
          }}
        ></div>
      </div>
      <p className="text-neutral-700">แนวโน้มการทาย</p>
    </div>
  );
};
