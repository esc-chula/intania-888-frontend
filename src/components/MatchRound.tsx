export const Round = ({
  round,
}: {
  round: {
    time: string;
    colorA: string;
    colorB: string;
    status: string;
  };
}) => {
  return (
    <div className="bg-neutral-100 flex flex-row h-12 font-semibold">
      <div className="w-[20%] flex items-center justify-center text-indigo-700">
        {round.time}
      </div>
      <div className="w-[60%] flex items-center justify-center">
        {round.colorA} {round.colorB}
      </div>
      <div className="w-[20%] flex items-center justify-center"></div>
    </div>
  );
};
