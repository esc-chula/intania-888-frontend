"use client";

import Link from "next/link";
import { LeaderboardMetric } from "@/types/leaderboard";

interface LeaderboardTabsProps {
  scope: "individual" | "team";
  value?: LeaderboardMetric;
  onChange?: (value: LeaderboardMetric) => void;
  accuracyDisabled?: boolean;
}

const tabClass = (active: boolean) =>
  `flex h-11 min-w-28 items-center justify-center rounded px-5 font-semibold transition-colors ${
    active
      ? "bg-neutral-600 text-white"
      : "bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
  }`;

export const LeaderboardTabs = ({
  scope,
  value = "coins",
  onChange,
  accuracyDisabled = false,
}: LeaderboardTabsProps) => {
  return (
    <div className="flex flex-col items-center gap-3" aria-label="ตัวเลือกตารางอันดับ">
      <nav className="flex gap-2" aria-label="ประเภทตารางอันดับ">
        <Link
          href="/coins"
          className={tabClass(scope === "individual")}
          aria-current={scope === "individual" ? "page" : undefined}
        >
          อันดับบุคคล
        </Link>
        <Link
          href="/leaderboard/team?view=coins"
          className={tabClass(scope === "team")}
          aria-current={scope === "team" ? "page" : undefined}
        >
          อันดับทีม
        </Link>
      </nav>

      {scope === "team" && (
        <div
          className="flex rounded bg-neutral-900 p-1"
          role="tablist"
          aria-label="ข้อมูลอันดับทีม"
        >
          <button
            type="button"
            role="tab"
            aria-selected={value === "coins"}
            className={tabClass(value === "coins")}
            onClick={() => onChange?.("coins")}
          >
            เหรียญทีม
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={value === "accuracy"}
            disabled={accuracyDisabled}
            className={`${tabClass(value === "accuracy")} disabled:cursor-not-allowed disabled:opacity-40`}
            onClick={() => onChange?.("accuracy")}
          >
            ความแม่นยำ
          </button>
        </div>
      )}
    </div>
  );
};

