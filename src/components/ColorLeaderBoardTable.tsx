import { MatchColorLogo } from "./match/MatchColorLogo";
import { groupColor, leaderboardDataInterface } from "./ColorLeaderBoardUtils";

export const LeaderBoardTable = (props: {
  data: leaderboardDataInterface[] | undefined;
  varience: "WDL" | "123";
}) => {
  return (
    <table className="rounded-lg w-[90vw] sm:w-[600px] overflow-hidden text-[0.8rem] sm:text-[1rem] h-auto">
      <thead className="bg-[#4E0F15] font-semibold h-12 flex flex-row">
        <tr className="w-full flex flex-row">
          <td className="flex items-center justify-center w-[15%] h-full">
            ลำดับ
          </td>
          <td className="flex items-center justify-start w-[20%] h-full ">
            สี
          </td>
          <td className="flex items-center justify-start w-[20%] h-full ">
            กรุ๊ป
          </td>
          <td className="flex flex-row space-x-2 items-center justify-center w-[15%] h-full max-sm:text-[0.7rem]">
            {props.varience == "123" ? "1st 🏆" : "ชนะ"}
          </td>
          <td className="flex flex-row space-x-2 items-center justify-center w-[15%] h-full  max-sm:text-[0.7rem]">
            {props.varience == "123" ? "2nd 🥈" : "เสมอ"}
          </td>
          <td className="flex flex-row space-x-2 items-center justify-center w-[15%] h-full max-sm:text-[0.7rem]">
            {props.varience == "123" ? "3-4th 🥉" : "แพ้"}
          </td>
        </tr>
      </thead>
      <tbody>
        {props.data != undefined
          ? props.data.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="text-black w-full bg-white font-semibold h-16 flex flex-row border-y-[0.5px]"
                >
                  <td className="flex items-center justify-center w-[15%] h-full ">
                    {index + 1}
                  </td>
                  <td className="flex items-center justify-start w-[20%] h-full ">
                    <MatchColorLogo color={item.id} />
                  </td>
                  <td className="flex items-center justify-start w-[20%] h-full ">
                    {groupColor[item.id]}
                  </td>
                  <td className="flex flex-row space-x-2 items-center justify-center w-[15%] h-full ">
                    {item.won}
                  </td>
                  <td className="flex flex-row space-x-2 items-center justify-center w-[15%] h-full ">
                    {item.drawn}
                  </td>
                  <td className="flex flex-row space-x-2 items-center justify-center w-[15%] h-full ">
                    {item.lost}
                  </td>
                </tr>
              );
            })
          : Array.from({ length: 6 }, (data, index: number) => (
              <tr
                key={index}
                className="text-black w-full bg-white font-semibold h-16 flex flex-row border-y-[0.5px]"
              >
                <td className="flex items-center justify-center w-[15%] h-full ">
                  {index + 1}
                </td>
                <td className="flex items-center justify-start w-[20%] h-full ">
                  <MatchColorLogo color="TBA" />
                </td>
                <td className="flex items-center justify-start w-[20%] h-full "></td>
                <td className="flex flex-row space-x-2 items-center justify-center w-[15%] h-full "></td>
                <td className="flex flex-row space-x-2 items-center justify-center w-[15%] h-full "></td>
                <td className="flex flex-row space-x-2 items-center justify-center w-[15%] h-full "></td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};
