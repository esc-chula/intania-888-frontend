"use client";

export interface TabOption<T extends string> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface LeaderboardTabsProps<T extends string> {
  tabs: readonly TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  variant?: "primary" | "segmented";
  ariaLabel?: string;
}

export const LeaderboardTabs = <T extends string>({
  tabs,
  value,
  onChange,
  variant = "primary",
  ariaLabel = "ตัวเลือกตารางอันดับ",
}: LeaderboardTabsProps<T>) => {
  const isSegmented = variant === "segmented";

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`flex flex-row items-center ${
        isSegmented
          ? "gap-2 rounded-lg bg-neutral-800 p-1.5 sm:gap-5 sm:p-2"
          : "gap-3 sm:gap-5"
      }`}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value;

        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-disabled={tab.disabled}
            disabled={tab.disabled}
            onClick={() => {
              if (!tab.disabled) onChange(tab.value);
            }}
            className={`rounded-lg font-semibold text-white transition-colors ${
              isActive
                ? "bg-neutral-700"
                : tab.disabled
                  ? "cursor-default bg-neutral-800 opacity-40"
                  : isSegmented
                    ? "bg-neutral-800 hover:bg-neutral-700/50"
                    : "bg-neutral-800 hover:bg-neutral-700/60"
            } ${
              isSegmented
                ? "h-10 w-32 text-sm sm:h-14 sm:w-[180px] sm:text-xl"
                : "h-12 w-36 text-base sm:h-[72px] sm:w-[220px] sm:text-2xl"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
