export const MatchMainFilter = (props: {
  mainFilter: string;
  handdleChangeMainFilter: (text: string) => void;
}) => {
  return (
    <div className="w-full flex flex-row space-x-2 sm:space-x-4 items-center justify-center">
      <button
        className={`${
          props.mainFilter === "upcomming"
            ? "bg-neutral-700 text-white"
            : "bg-neutral-800 text-neutral-300 "
        } flex items-center justify-center h-10 w-40 sm:h-14 sm:w-48  text-[0.8rem] sm:text-lg rounded-lg font-semibold`}
        onClick={() => props.handdleChangeMainFilter("upcomming")}
      >
        ตารางการแข่งขัน
      </button>
      <button
        className={`${
          props.mainFilter === "result"
            ? "bg-neutral-700 text-white"
            : "bg-neutral-800 text-neutral-300 "
        } flex items-center justify-center h-10 w-40 sm:h-14 text-[0.8rem] sm:text-lg sm:w-48 rounded-lg font-semibold`}
        onClick={() => props.handdleChangeMainFilter("result")}
      >
        ผลการแข่งขัน
      </button>
      <button
        className={`${
          props.mainFilter === "overall"
            ? "bg-neutral-700 text-white"
            : "bg-neutral-800 text-neutral-300 "
        } flex items-center justify-center h-10 w-40 sm:h-14 text-[0.8rem] sm:text-lg sm:w-48 rounded-lg font-semibold`}
        onClick={() => props.handdleChangeMainFilter("overall")}
      >
        ภาพรวม
      </button>
    </div>
  );
};
