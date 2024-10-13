"use client";

import { EventButton } from "@/components/EventButton";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Coins } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start space-y-4 h-screen w-screen">
      <div className="relative m-0 p-0 top-0 flex flex-col w-full">
        <Header />
        <Navbar pagenow="event" />
      </div>
      <div className="flex items-center justify-center flex-col space-y-4">
        <p className="text-sm max-w-[70%] text-center sm:hidden text-white">
          ดูและทายผลการแข่งกีฬา intania game ฟรี! เว็บเดียวในวิศวะจุฬา
          แชร์กันเยอะๆ
        </p>
        <div className="flex items-center justify-center space-x-2.5">
          <Link
            href="/event"
            className="max-sm:text-sm text-lg text-white font-semibold rounded-lg h-10 w-40 sm:h-14 sm:w-48 bg-neutral-800 flex items-center justify-center"
          >
            มินิเกม
          </Link>
          <Link
            href="/event/daily"
            className="max-sm:text-sm text-lg text-white font-semibold rounded-lg h-10 w-40 sm:h-14 sm:w-48 bg-neutral-700 flex items-center justify-center"
          >
            อีเวนต์
          </Link>
        </div>
      </div>
      <div className="w-[95%] sm:w-[700px] flex flex-col space-y-4">
        <div className="w-full h-suto rounded-lg overflow-hidden text-white">
          <div className="flex items-center justify-center font-semibold flex-col bg-[#4E0F15] py-4  space-y-2">
            <p className="text-xl underline">อีเวนต์ประจำวัน</p>
            <div className="flex flex-row space-x-1 sm:space-x-2 relative">
              <p className="text-xs sm:text-sm">
                ล้อกอินประจำวัน รับเลย! วันละ 300
              </p>
              <Coins className="relative -top-1" width={20} color="Yellow" />
              <p className="text-xs sm:text-sm">
                อย่าลืมเข้ามาล้อกอินทุกวันนะ!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 font-semibold flex-row bg-neutral-100 py-1  text-black">
            <p className="text-sm sm:text-lg">📌 ล้อกอินประจำวัน</p>

            <EventButton Sstate={1} type={"daily"} link={""} />
          </div>
        </div>
      </div>
    </div>
  );
}
