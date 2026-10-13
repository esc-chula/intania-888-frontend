"use client";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { PageWithFooter } from "@/components/PageWithFooter";
import Link from "next/link";
import MineTable from "@/components/stakemine/MineTable";

export default function MineStake() {
  return (
    <PageWithFooter>
      <div className="flex flex-1 flex-col items-center gap-4 w-full pb-8">
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
        <MineTable/>
        <Link href="/event" className="flex-1">
          <p className="text-white underline text-md">กลับสู่หน้าอีเวนต์</p>
        </Link>
      </div>
    </PageWithFooter>
  );
}
