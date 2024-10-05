import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Intania888Logo } from "../../../public/logos/Intania888-logo";
import SlipElement from "@/components/slip/SlipElement";
import Link from "next/link";

import { Coins } from "lucide-react";

export default function Home() {
  const coins = 500.00;

  const slipElements = [
    {
      date: "วันจันทร์ที่ 28 ตุลาคม 2567",
      sportType: "ฟุตบอลชาย ปี 1",
      teamAColor: "pink",
      teamBColor: "yellow",
      currentRate: 2.00,
    },
    {
      date: "วันจันทร์ที่ 28 ตุลาคม 2567",
      sportType: "ฟุตบอลชาย ปี 1",
      teamAColor: "pink",
      teamBColor: "yellow",
      currentRate: 2.00,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start space-y-4 h-screen w-screen">
      <div className="relative m-0 p-0 top-0 flex flex-col w-full">
        <Header />
        <Navbar pagenow="slip" />
      </div>
      <div className="flex items-center justify-center flex-col space-y-4">
        <p className="text-white text-center font-semibold text-xs">
          ดูและทายผลการแข่งกีฬา intania game ฟรี! เว็บเดียวในวิศวะจุฬา แชร์กันเยอะๆ
        </p>
        <div className="flex items-center justify-center space-x-2.5">
          <Link href="/slip" className="text-sm text-white font-semibold rounded w-28 h-9 bg-neutral-700 flex items-center justify-center">
            สลิปปัจจุบัน
          </Link>
          <Link href="/slip/history" className="text-sm text-white font-semibold rounded w-28 h-9 bg-neutral-800 flex items-center justify-center">
            ประวัติ
          </Link>
        </div>
        <div className="flex flex-col">
          <p className="text-white font-semibold text-xs">
            โปรดอ่านเงื่อนไขก่อนทายผล :
          </p>
          <ul className="text-white text-xs space-y-1">
            <li>1. เรทมีการเปลี่ยนแปลงตลอดเวลา โดยจะยึดตามตอนที่ผู้ใช้ทำการทาย</li>
            <li>2. หากเลือกทายผลเพียง 1 คู่ จะเป็นการทายผล <span className="font-bold">แบบเดี่ยว</span> โดยอัตโนมัติ</li>
            <li>3. หากเลือกทายผลมากกว่า 1 คู่ จะเป็นการทายผล <span className="font-bold">แบบชุด</span> โดยอัตโนมัติ</li>
            <li className="pl-4">3.1 การทายผลแบบชุดจะได้เรทที่สูงกว่าการทายแบบเดี่ยว</li>
            <li className="pl-4">3.2 การทายผลแบบชุดหากทายผิดแม้แต่ 1 คู่ จะถือว่าทายผิดทั้งหมด</li>
          </ul>
        </div>
      </div>
      <main className="flex flex-col items-center justify-center text-white p-4 w-96 rounded-lg">
        <section className="w-full flex items-center justify-center bg-gradient-to-t from-[#4E0F15] to-[#68141C] p-4 rounded-t-lg">
          <div className="w-28">
            <Intania888Logo />
          </div>
        </section>
        <section className="w-full flex items-center justify-center flex-col">
          {slipElements.map((element, idx) => (
            <SlipElement
              key={idx}
              date={element.date}
              sportType={element.sportType}
              teamAColor={element.teamAColor}
              teamBColor={element.teamBColor}
              currentRate={element.currentRate}
            />
          ))}
        </section>
        <section className="flex items-center flex-col w-full">
          <section className="w-full bg-neutral-300 font-semibold text-sm h-10 flex items-center pl-3">
            <p className="text-black">รูปแบบการทาย: <span className="text-indigo-700">แบบเดี่ยว</span></p>
          </section>
          <section className="w-full bg-neutral-200 font-semibold text-sm h-10 flex items-center justify-between px-3">
            <p className="text-black">จำนวนเหรียญที่ใช้เดินพัน</p>
            <div className="flex items-center space-x-1">
              <input type="text" className="text-black text-right h-7 p-2 border border-gray-300 rounded-lg w-24"></input>
              <Coins color="black" />
            </div>
          </section>
          <section className="w-full bg-neutral-200 font-semibold text-sm h-10 flex items-center justify-between px-3">
            <p className="text-black">เหรียญที่พึ่งพาได้</p>
            <div className="flex items-center space-x-1">
              <p className="text-black font-semibold">{coins}</p>
              <Coins color="black" />
            </div>
          </section>
          <section className="w-full h-10 flex items-center justify-center p-4 rounded-b-lg bg-green-800">
            <button className="text-white font-semibold">ยืนยันการทาย</button>
          </section>
        </section>
      </main>
    </div>
  );
}
