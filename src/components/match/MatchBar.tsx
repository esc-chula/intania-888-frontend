import { colorMap } from "./MatchColorLogo";
export const Matchbar = (props: {
  colorA: string;
  colorB: string;
  scoreA: number;
  scoreB: number;
}) => {
  let { scoreA, scoreB } = props;

  const totalScore = scoreA + scoreB;

  if (totalScore === 0) {
    scoreA = 50;
    scoreB = 50;
  } else {
    const percentA = (scoreA / totalScore) * 100;

    scoreA = Math.round(percentA);
    scoreB = 100 - scoreA; 
  }

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
