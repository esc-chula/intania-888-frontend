"use client";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import SlotMachine from "@/components/slot/SlotMachine";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-start space-y-4 min-h-screen w-screen pb-32">
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
      <SlotMachine />
      <Link href="/event" className="flex-1">
        <p className="text-white underline text-md">กลับ</p>
      </Link>
      <Footer />
    </div>
  );
}
