import { Suspense } from "react";
import { TeamLeaderboardPage } from "@/components/leaderboard/TeamLeaderboardPage";

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-black text-white">
    กำลังโหลด...
  </div>
);

export default function TeamLeaderboardRoute() {
  return (
    <Suspense fallback={<PageFallback />}>
      <TeamLeaderboardPage />
    </Suspense>
  );
}

