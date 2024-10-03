import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { randomInt } from "crypto";
import { Coins } from "lucide-react";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start space-y-4 h-screen text-white overflow-scroll">
      <div className="relative m-0 p-0 top-0 flex flex-col w-screen">
        <Header />
        <Navbar pagenow="coins" />
      </div>
      <h1 className="text-2xl font-semibold">ลิสต์รายชื่อมหาเศรษฐี</h1>
      <table className="rounded-lg w-[90vw] sm:w-[600px] overflow-hidden text-[0.8rem] sm:text-[1rem]">
        <thead className="bg-[#4E0F15] font-semibold h-12 flex flex-row">
          <tr className="w-full flex flex-row">
            <td className="flex items-center justify-center w-[15%] h-full">
              ลำดับ
            </td>
            <td className="flex items-center justify-start w-[45%] sm:w-[55%] h-full ">
              ชื่อ
            </td>
            <td className="flex flex-row space-x-2 items-center justify-end pr-2 sm:pr-10 w-[40%] sm:w-[30%] h-full ">
              <p>จำนวนเหรียญ</p> <Coins color="yellow" />
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
                <td className="flex items-center justify-center w-[15%] h-full ">
                  {index + 1}
                </td>
                <td className="flex items-center justify-start w-[55%] h-full ">
                  <NameAndColor name={item.name} color={item.color} />
                </td>
                <td className="flex flex-row space-x-2 items-center justify-end pr-10 sm:pr-20 w-[30%] h-full ">
                  <p>
                    {index * 15000 + randomInt(1000)}.{randomInt(100)}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="font-semibold bg-neutral-200 text-black h-12 flex flex-row">
          <tr className="w-full flex flex-row">
            <td className="flex items-center justify-center w-[15%] h-full ">
              157
            </td>
            <td className="flex items-center justify-start w-[55%] h-full ">
              <NameAndColor name="เจ้าหมู" color="pink" />
            </td>
            <td className="flex flex-row space-x-2 items-center justify-end pr-10 sm:pr-20 w-[30%] h-full ">
              15000.00
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

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

const NameAndColor = (props: { name: string; color: string }) => {
  if (props.color == "violet")
    return (
      <p>
        {props.name} <span className="text-team-violet">สีม่วง </span>
      </p>
    );
  if (props.color == "blue")
    return (
      <p>
        {props.name} <span className="text-team-blue">สีฟ้า</span>
      </p>
    );
  if (props.color == "yellow")
    return (
      <p>
        {props.name} <span className="text-team-yellow">สีเหลือง</span>
      </p>
    );
  if (props.color == "green")
    return (
      <p>
        {props.name} <span className="text-team-green">สีเขียว</span>
      </p>
    );
  if (props.color == "pink")
    return (
      <p>
        {props.name} <span className="text-team-pink">สีชมพู</span>
      </p>
    );
  if (props.color == "orange")
    return (
      <p>
        {props.name} <span className="text-team-orange">สีส้ม</span>
      </p>
    );
};
