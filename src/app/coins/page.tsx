"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { CoinLeaderBoardTable } from "@/components/CoinLeaderBoardTable";
import { Navbar } from "@/components/Navbar";
import {
  LeaderboardTabs,
  TabOption,
} from "@/components/leaderboard/LeaderboardTabs";

type LeaderboardScope = "individual" | "team";

const scopeTabs: readonly TabOption<LeaderboardScope>[] = [
  { value: "individual", label: "อันดับบุคคล" },
  { value: "team", label: "อันดับทีม" },
];

export default function Home() {
  const router = useRouter();

  const handleScopeChange = (scope: LeaderboardScope) => {
    router.push(
      scope === "individual" ? "/coins" : "/leaderboard/team?view=coins"
    );
  };

  return (
    <div className="flex flex-col items-center justify-start space-y-4 h-screen w-screen text-white overflow-y-scroll pb-12">
      <div className="relative m-0 p-0 top-0 flex flex-col w-full">
        <Header />
        <Navbar pagenow="coins" />
      </div>
      <p className="text-sm max-w-[70%] text-center sm:hidden">
        ดูและทายผลการแข่งกีฬา intania game ฟรี! เว็บเดียวในวิศวะจุฬา
        แชร์กันเยอะๆ
      </p>
      <h1 className="text-2xl font-semibold my-2">ตารางอันดับ</h1>
      <LeaderboardTabs
        tabs={scopeTabs}
        value="individual"
        onChange={handleScopeChange}
        ariaLabel="ประเภทตารางอันดับ"
      />
      <h2 className="text-xl font-semibold my-2">ลิสต์รายชื่อมหาเศรษฐี</h2>
      <CoinLeaderBoardTable />
    </div>
  );
}
