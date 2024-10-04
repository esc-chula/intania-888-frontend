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
    <div className="bg-neutral-100 flex flex-row h-16 font-semibold text-black">
      <div className="w-[20%] flex items-center justify-center text-indigo-700">
        {round.time}
      </div>
      <div className="w-[60%] flex items-center justify-center">
        {round.colorA} {round.colorB}
      </div>
      <div className="w-[20%] flex items-center justify-center">
        {round.status === "bet" && (
          <button className="w-28 h-10 bg-neutral-200 rounded-lg flex flex-row items-center justify-center">
            + เพิ่มลงสลิป
          </button>
        )}
      </div>
    </div>
  );
};
