"use client";

export interface TabOption<T extends string> {
  value: T;
  label: string;
}

interface LeaderboardTabsProps<T extends string> {
  tabs: TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  // primary: separate buttons (อันดับบุคคล / อันดับสี)
  // segmented: buttons grouped in a container (เหรียญทีม / ความแม่นยำ)
  variant?: "primary" | "segmented";
}

export const LeaderboardTabs = <T extends string>({
  tabs,
  value,
  onChange,
  variant = "primary",
}: LeaderboardTabsProps<T>) => {
  const isSegmented = variant === "segmented";

  return (
    <div
      role="tablist"
      className={`flex flex-row items-center ${
        isSegmented
          ? "bg-neutral-800 rounded-lg p-1.5 sm:p-2 gap-2 sm:gap-5"
          : "gap-3 sm:gap-5"
      }`}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={`rounded-lg font-semibold text-white transition-colors ${
              isActive
                ? "bg-neutral-700"
                : isSegmented
                ? "bg-neutral-800 hover:bg-neutral-700/50"
                : "bg-neutral-800 hover:bg-neutral-700/60"
            } ${
              isSegmented
                ? "w-32 sm:w-[180px] h-10 sm:h-14 text-sm sm:text-xl"
                : "w-36 sm:w-[220px] h-12 sm:h-[72px] text-base sm:text-2xl"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
