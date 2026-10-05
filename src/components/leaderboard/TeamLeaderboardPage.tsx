"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Coins } from "lucide-react";
import {
  getTeamAccuracyLeaderboard,
  TeamAccuracyLeaderboardError,
} from "@/api/leaderboard/teamAccuracy";
import {
  getTeamCoinLeaderboard,
  TeamCoinLeaderboardError,
} from "@/api/leaderboard/teamCoin";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Shirt } from "@/components/match/MatchColorLogo";
import { getColorIdByGroupId } from "@/constant/teamColor";
import useAuth from "@/hooks/useAuth";
import {
  LeaderboardMetric,
  TeamAccuracyRankingItem,
  TeamAccuracyViewItem,
  TeamCoinRankingItem,
  TeamCoinViewItem,
} from "@/types/leaderboard";
import { formatMoneyString } from "@/utils/money";
import { LeaderboardRow, LeaderboardTable } from "./LeaderboardTable";
import { LeaderboardTabs, TabOption } from "./LeaderboardTabs";
import { Podium, PodiumEntry } from "./Podium";

const ACCURACY_MOCK_ENABLED =
  process.env.NEXT_PUBLIC_USE_TEAM_ACCURACY_MOCK !== "false";

type LeaderboardScope = "individual" | "team";

const scopeTabs: readonly TabOption<LeaderboardScope>[] = [
  { value: "individual", label: "อันดับบุคคล" },
  { value: "team", label: "อันดับทีม" },
];

const metricTabs: readonly TabOption<LeaderboardMetric>[] = [
  { value: "coins", label: "เหรียญทีม" },
  {
    value: "accuracy",
    label: "ความแม่นยำ",
  },
];

const formatCount = (value: number) => value.toLocaleString("en-US");

const CurrentTeamLabel = () => (
  <span className="text-xs font-semibold text-amber-300 sm:text-sm">
    (สีของคุณ)
  </span>
);

const TeamLeaderboardLoading = () => (
  <div
    className="flex w-full max-w-md animate-pulse flex-col items-center gap-3"
    aria-label="กำลังโหลดตารางอันดับทีม"
  >
    <div className="h-64 w-full rounded-lg bg-neutral-800" />
    <div className="h-44 w-full rounded-lg bg-neutral-800" />
  </div>
);

export const TeamLeaderboardPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth({ optional: true });
  const [coinRankings, setCoinRankings] = useState<TeamCoinRankingItem[]>([]);
  const [accuracyRankings, setAccuracyRankings] = useState<
    TeamAccuracyRankingItem[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<
    TeamCoinLeaderboardError | TeamAccuracyLeaderboardError | null
  >(null);
  const [requestVersion, setRequestVersion] = useState(0);

  const requestedView = searchParams.get("view");
  const activeView: LeaderboardMetric =
    requestedView === "accuracy" ? "accuracy" : "coins";

  useEffect(() => {
    let cancelled = false;

    const loadLeaderboard = async () => {
      setLoading(true);
      setError(null);

      try {
        if (activeView === "accuracy") {
          const data = await getTeamAccuracyLeaderboard();
          if (!cancelled) setAccuracyRankings(data);
        } else {
          const data = await getTeamCoinLeaderboard();
          if (!cancelled) setCoinRankings(data);
        }
      } catch (loadError) {
        if (cancelled) return;

        if (
          loadError instanceof TeamCoinLeaderboardError ||
          loadError instanceof TeamAccuracyLeaderboardError
        ) {
          setError(loadError);
        } else {
          setError(
            activeView === "accuracy"
              ? new TeamAccuracyLeaderboardError("Unable to load team accuracy")
              : new TeamCoinLeaderboardError(
                  "Unable to load the team leaderboard",
                ),
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadLeaderboard();

    return () => {
      cancelled = true;
    };
  }, [activeView, requestVersion]);

  const currentTeamId = getColorIdByGroupId(user?.profile.group_id);

  const coinViewItems = useMemo<TeamCoinViewItem[]>(
    () =>
      coinRankings.map((item) => ({
        rank: item.rank,
        colorId: item.colorId,
        title: item.title,
        teamCoinsText: formatMoneyString(item.teamCoins),
        isCurrentTeam: item.colorId === currentTeamId,
      })),
    [coinRankings, currentTeamId],
  );

  const accuracyViewItems = useMemo<TeamAccuracyViewItem[]>(
    () =>
      accuracyRankings.map((item) => ({
        ...item,
        isCurrentTeam: item.colorId === currentTeamId,
      })),
    [accuracyRankings, currentTeamId],
  );

  const podiumEntries = useMemo<PodiumEntry[]>(
    () =>
      ([1, 2, 3] as const).map((rank) => {
        if (activeView === "accuracy") {
          const item = accuracyViewItems.find((entry) => entry.rank === rank);

          if (!item) return { color: "TBA", name: "-", stat: "-" };

          return {
            color: item.colorId,
            name: item.title,
            subtitle: item.isCurrentTeam ? <CurrentTeamLabel /> : undefined,
            stat: (
              <>
                <span className="text-green-300">
                  ถูก {formatCount(item.right)}
                </span>
                <span className="text-red-300">
                  ผิด {formatCount(item.wrong)}
                </span>
              </>
            ),
          };
        }

        const item = coinViewItems.find((entry) => entry.rank === rank);

        if (!item) return { color: "TBA", name: "-", stat: "-" };

        return {
          color: item.colorId,
          name: item.title,
          subtitle: item.isCurrentTeam ? <CurrentTeamLabel /> : undefined,
          stat: (
            <>
              {item.teamCoinsText}
              <Coins className="h-3 w-3 text-yellow-400 sm:h-5 sm:w-5" />
            </>
          ),
        };
      }),
    [accuracyViewItems, activeView, coinViewItems],
  );

  const remainingRows = useMemo<LeaderboardRow[]>(() => {
    if (activeView === "accuracy") {
      return accuracyViewItems
        .filter((item) => item.rank >= 4 && item.rank <= 6)
        .map((item) => ({
          key: item.colorId,
          rank: item.rank,
          highlight: item.isCurrentTeam,
          name: (
            <div className="flex items-center gap-2">
              <Shirt color={item.colorId} className="h-6 sm:h-9" />
              <span>{item.title}</span>
              {item.isCurrentTeam && (
                <span className="text-xs text-neutral-600 sm:text-sm">
                  (สีของคุณ)
                </span>
              )}
            </div>
          ),
          value: (
            <div className="grid w-full grid-cols-2 text-center">
              <span className="text-green-700">{formatCount(item.right)}</span>
              <span className="text-red-700">{formatCount(item.wrong)}</span>
            </div>
          ),
        }));
    }

    return coinViewItems
      .filter((item) => item.rank >= 4 && item.rank <= 6)
      .map((item) => ({
        key: item.colorId,
        rank: item.rank,
        highlight: item.isCurrentTeam,
        name: (
          <div className="flex items-center gap-2">
            <Shirt color={item.colorId} className="h-6 sm:h-9" />
            <span>{item.title}</span>
            {item.isCurrentTeam && (
              <span className="text-xs text-neutral-600 sm:text-sm">
                (สีของคุณ)
              </span>
            )}
          </div>
        ),
        value: item.teamCoinsText,
      }));
  }, [accuracyViewItems, activeView, coinViewItems]);

  const handleScopeChange = useCallback(
    (scope: LeaderboardScope) => {
      router.push(
        scope === "individual" ? "/coins" : "/leaderboard/team?view=coins",
      );
    },
    [router],
  );

  const handleViewChange = useCallback(
    (view: LeaderboardMetric) => {
      router.replace(`/leaderboard/team?view=${view}`);
    },
    [router],
  );

  const isEmpty =
    activeView === "accuracy"
      ? accuracyViewItems.length === 0
      : coinViewItems.length === 0;
  const showLoading = loading;
  const activeError = error;

  return (
    <div className="min-h-screen w-full bg-black pb-16 text-white">
      <Header />
      <Navbar pagenow="coins" allowAnonymous />

      <main className="mx-auto flex w-[92vw] max-w-2xl flex-col items-center gap-4 py-5">
        <p className="max-w-[70vw] text-center text-sm sm:hidden">
          ดูและทายผลการแข่งขันกีฬา intania game ฟรี! เว็บเดียวในวิศวะจุฬา
          แชร์กันเยอะๆ
        </p>

        <h1 className="text-2xl font-semibold">ตารางอันดับ</h1>
        <LeaderboardTabs
          tabs={scopeTabs}
          value="team"
          onChange={handleScopeChange}
          ariaLabel="ประเภทตารางอันดับ"
        />
        <LeaderboardTabs
          tabs={metricTabs}
          value={activeView}
          onChange={handleViewChange}
          variant="segmented"
          ariaLabel="ข้อมูลอันดับทีม"
        />

        {activeView === "accuracy" && ACCURACY_MOCK_ENABLED && (
          <p className="text-xs text-neutral-400">ข้อมูลจำลองสำหรับพัฒนา UI</p>
        )}

        {showLoading ? (
          <TeamLeaderboardLoading />
        ) : activeError ? (
          <section className="flex max-w-md flex-col items-center gap-3 rounded-lg bg-neutral-900 p-6 text-center">
            <h2 className="text-lg font-semibold">ไม่สามารถโหลดอันดับทีมได้</h2>
            <p className="text-sm text-neutral-300">{activeError.message}</p>
            {activeError.requestId && (
              <p className="text-xs text-neutral-500">
                Request ID: {activeError.requestId}
              </p>
            )}
            <button
              type="button"
              className="rounded bg-[#4E0F15] px-5 py-2 font-semibold hover:bg-[#68141C]"
              onClick={() => setRequestVersion((version) => version + 1)}
            >
              ลองใหม่
            </button>
          </section>
        ) : isEmpty ? (
          <section className="rounded-lg bg-neutral-900 p-6 text-center">
            <h2 className="text-lg font-semibold">ยังไม่มีข้อมูลอันดับทีม</h2>
          </section>
        ) : (
          <div
            className="flex w-full flex-col items-center gap-3"
            role="tabpanel"
            aria-label={
              activeView === "accuracy" ? "อันดับความแม่นยำ" : "อันดับเหรียญทีม"
            }
          >
            <Podium entries={podiumEntries} />
            <LeaderboardTable
              valueHeader={
                activeView === "accuracy" ? (
                  <div className="grid w-full grid-cols-2 text-center">
                    <span>ถูก</span>
                    <span>ผิด</span>
                  </div>
                ) : (
                  <>
                    <span>จำนวนเหรียญ</span>
                    <Coins className="h-4 w-4 text-yellow-400 sm:h-6 sm:w-6" />
                  </>
                )
              }
              rows={remainingRows}
            />
          </div>
        )}
      </main>
    </div>
  );
};
