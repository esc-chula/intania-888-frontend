import { EmptyState } from "@/components/EmptyState";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import SlotMachine  from '@/components/slot/SlotMachine';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start space-y-4 h-screen w-screen">
      <div className="relative m-0 p-0 top-0 flex flex-col w-full">
        <Header />
        <Navbar pagenow="event" />
      </div>
      <div className="flex items-center justify-center flex-col space-y-4">
        <p className="text-white text-center font-semibold text-xs">
          ดูและทายผลการแข่งกีฬา intania game ฟรี! เว็บเดียวในวิศวะจุฬา แชร์กันเยอะๆ
        </p>
        <div className="flex items-center justify-center space-x-2.5">
          <Link href="/event" className="text-sm text-white font-semibold rounded w-28 h-9 bg-neutral-700 flex items-center justify-center">
            มินิเกม
          </Link>
          <Link href="/event/daily" className="text-sm text-white font-semibold rounded w-28 h-9 bg-neutral-800 flex items-center justify-center">
            อีเวนต์
          </Link>
        </div>
      </div>
      <SlotMachine />
    </div>
  );
}
