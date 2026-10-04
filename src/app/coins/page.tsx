"use client";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { apiClient } from "@/api/axios";
import { getAllUser } from "@/api/coin/getCoin";
import { LeaderboardTabs } from "@/components/leaderboard/LeaderboardTabs";
import { IndividualLeaderboard } from "@/components/leaderboard/IndividualLeaderboard";
import { TeamLeaderboard } from "@/components/leaderboard/TeamLeaderboard";
import { LeaderboardUser } from "@/components/leaderboard/LeaderboardUtils";

type LeaderboardView = "individual" | "team";

const viewTabs: { value: LeaderboardView; label: string }[] = [
  { value: "individual", label: "อันดับบุคคล" },
  { value: "team", label: "อันดับสี" },
];

export default function Home() {
  const [view, setView] = useState<LeaderboardView>("individual");
  const [users, setUsers] = useState<LeaderboardUser[] | undefined>(undefined);
  const [me, setMe] = useState<LeaderboardUser | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const [myData, allUser] = await Promise.all([
        apiClient.get("/auth/me").then((res) => res.data.profile),
        getAllUser(),
      ]);
      setMe(myData);
      setUsers(allUser?.data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start space-y-4 h-screen w-screen text-white overflow-y-scroll pb-12 bg-gradient-to-b from-neutral-900 to-black">
      <div className="relative m-0 p-0 top-0 flex flex-col w-full">
        <Header />
        <Navbar pagenow="coins" />
      </div>
      <p className="text-sm max-w-[70%] text-center sm:hidden">
        ดูและทายผลการแข่งกีฬา intania game ฟรี! เว็บเดียวในวิศวะจุฬา
        แชร์กันเยอะๆ
      </p>
      <h1 className="text-2xl sm:text-[32px] font-semibold my-2">ตารางอันดับ</h1>
      <LeaderboardTabs tabs={viewTabs} value={view} onChange={setView} />

      <div className="pt-2 sm:pt-4">
        {view === "individual" ? (
          <IndividualLeaderboard users={users} me={me} />
        ) : (
          <TeamLeaderboard users={users} me={me} />
        )}
      </div>
    </div>
  );
}
