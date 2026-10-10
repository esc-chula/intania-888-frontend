"use client";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventButton } from "@/components/EventButton";
import { Coins } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const warGameUrl = process.env.NEXT_PUBLIC_INTANIA_GAMES_URL;

  return (
    <div className="flex flex-col items-center justify-start space-y-4 min-h-screen w-screen pb-32">
      <div className="relative m-0 p-0 top-0 flex flex-col w-full">
        <Header />
        <Navbar pagenow="event" />
      </div>
      <div className="flex items-center justify-center flex-col space-y-4">
        <p className="text-sm max-w-[70%] text-center sm:hidden text-white">
          ดูและทายผลการแข่งกีฬา intania game ฟรี! เว็บเดียวในวิศวะจุฬา
          แชร์กันเยอะๆ
        </p>
      </div>
      {/* Daily Event */}
      <div className="w-[95%] sm:w-[700px] flex flex-col space-y-4">
        <div className="w-full h-suto rounded-lg overflow-hidden text-white">
          <div className="flex items-center justify-center font-semibold flex-col bg-[#4E0F15] py-4  space-y-2">
            <p className="text-xl underline">อีเวนต์ประจำวัน</p>
            <div className="flex flex-row space-x-1 sm:space-x-2 relative">
              <p className="text-xs sm:text-sm">
                ล็อกอินประจำวันเพื่อรับเหรียญรางวัล
              </p>
              <Coins className="relative -top-1" width={20} color="Yellow" />
              <p className="text-xs sm:text-sm">
                อย่าลืมเข้ามาล็อกอินทุกวันนะ!
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 font-semibold flex-row bg-neutral-100 py-1  text-black">
            <p className="text-sm sm:text-lg">📌 ล็อกอินประจำวัน</p>
            <EventButton Sstate={1} type={"daily"} link={""} />
          </div>
        </div>
      </div>
      {/* Mini Games */}
      <div className="w-[95%] sm:w-[700px] flex flex-col space-y-4">
        <div className="w-full h-suto rounded-lg overflow-hidden text-white">
          <div className="flex items-center justify-center font-semibold flex-col bg-[#4E0F15] py-4  space-y-2">
            <p className="text-xl underline">มินิเกม</p>
            <p className="text-xs sm:text-sm text-center">
              เข้าเล่นมินิเกมเพื่อรับเหรียญรางวัล และนำไปใช้ได้ใน War Game!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-neutral-100 px-3 py-4 font-semibold text-black sm:grid-cols-3">
            <Link
              href="/event/slots"
              className="flex flex-1 items-center justify-center shadow-lg rounded-md py-4 px-3 bg-white flex-col space-y-4 cursor-pointer hover:bg-gray-50"
            >
              <p className="text-6xl sm:text-7xl">🎰</p>
              <p className="text-xl">Slots</p>
            </Link>
            <Link
              href="/event/mines"
              className="flex flex-1 items-center justify-center shadow-lg rounded-md py-4 px-3 bg-white flex-col space-y-4 cursor-pointer hover:bg-gray-50"
            >
              <p className="text-6xl sm:text-7xl">💣</p>
              <p className="text-xl">Mines</p>
            </Link>
            {warGameUrl ? (
              <a
                href={warGameUrl}
                className="col-span-2 flex cursor-pointer flex-col items-center justify-center space-y-4 rounded-md bg-white px-3 py-4 shadow-lg hover:bg-gray-50 sm:col-span-1"
              >
                <p className="text-6xl sm:text-7xl">🪖</p>
                <p className="text-xl">War Game</p>
              </a>
            ) : (
              <div
                aria-disabled="true"
                className="col-span-2 flex flex-col items-center justify-center space-y-4 rounded-md bg-neutral-200 px-3 py-4 text-neutral-500 sm:col-span-1"
              >
                <p className="text-6xl opacity-60 sm:text-7xl">🪖</p>
                <div className="text-center">
                  <p className="text-xl">War Game</p>
                  <p className="text-xs">ยังไม่เปิดให้บริการ</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
