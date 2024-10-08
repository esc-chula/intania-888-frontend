import { getColorLeaderboard } from "@/api/match/getColorLeaderboard";

export const CoinLeaderBoardTable = () => {
  return (
    <table className="rounded-lg w-[90vw] sm:w-[600px] overflow-hidden text-[0.8rem] sm:text-[1rem] h-auto">
      <thead className="bg-[#4E0F15] font-semibold h-12 flex flex-row">
        <tr className="w-full flex flex-row">
          <td className="flex items-center justify-center w-[10%] h-full">
            ลำดับ
          </td>
          <td className="flex items-center justify-start w-[20%] h-full ">
            สี
          </td>
          <td className="flex items-center justify-start w-[20%] h-full ">
            กรุ๊ป
          </td>
          <td className="flex flex-row space-x-2 items-center justify-end pr-2 sm:pr-10 w-[16%] h-full ">
            1st 🏆
          </td>
          <td className="flex flex-row space-x-2 items-center justify-end pr-2 sm:pr-10 w-[16%] h-full ">
            2nd 🥈
          </td>
          <td className="flex flex-row space-x-2 items-center justify-end pr-2 sm:pr-10 w-[16%] h-full ">
            3-4th 🥉
          </td>
        </tr>
      </thead>
      <tbody>
        {Top10.map((item, index) => {
          return (
            <tr
              key={index}
              className="text-black w-full bg-white font-semibold h-12 flex flex-row border-y-[0.5px]"
            >
              <td className="flex items-center justify-center w-[10%] h-full ">
                {index + 1}
              </td>
              <td className="flex items-center justify-start w-[20%] h-full ">
                <NameAndColor name={item.name} color={item.color} />
              </td>
              <td className="flex items-center justify-start w-[20%] h-full ">
                {groupColor[item.color]}
              </td>
              <td className="flex flex-row space-x-2 items-center justify-end pr-10 sm:pr-20 w-[30%] h-full ">
                {10}
              </td>
              <td className="flex flex-row space-x-2 items-center justify-end pr-10 sm:pr-20 w-[30%] h-full ">
                {0}
              </td>
              <td className="flex flex-row space-x-2 items-center justify-end pr-10 sm:pr-20 w-[30%] h-full ">
                {0}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Top10 = [
  { name: "เจ้าเข้ม", color: "pink" },
  { name: "เจ้าก้อน", color: "blue" },
  { name: "เจ้าต้าว", color: "green" },
  { name: "เจ้าเธอ", color: "yellow" },
  { name: "เจ้าฉัน", color: "orange" },
  { name: "เจ้าเย่ะ", color: "violet" },
  { name: "เจ้านีร", color: "pink" },
  { name: "เจ้าแบงค์", color: "violet" },
  { name: "เจ้าปัญ", color: "blue" },
  { name: "เจ้าเจ้า", color: "yellow" },
];

const groupColor: { [key: string]: string } = {
  PINK: "[E,L,P]",
  ORANGE: "[J,K,M]",
  GREEN: "[H,S,T]",
  BLUE: "[Dog,N,R]",
  VIOLET: "[A,C,F]",
  YELLOW: "[B,G,Q]",
};
const NameAndColor = (props: { name: string; color: string }) => {
  if (props.color == "VIOLET")
    return (
      <p>
        {props.name} <span className="text-team-violet">สีม่วง </span>
      </p>
    );
  if (props.color == "BLUE")
    return (
      <p>
        {props.name} <span className="text-team-blue">สีฟ้า</span>
      </p>
    );
  if (props.color == "YELLOW")
    return (
      <p>
        {props.name} <span className="text-team-yellow">สีเหลือง</span>
      </p>
    );
  if (props.color == "GREEN")
    return (
      <p>
        {props.name} <span className="text-team-green">สีเขียว</span>
      </p>
    );
  if (props.color == "PINK")
    return (
      <p>
        {props.name} <span className="text-team-pink">สีชมพู</span>
      </p>
    );
  if (props.color == "ORANGE")
    return (
      <p>
        {props.name} <span className="text-team-orange">สีส้ม</span>
      </p>
    );
};
