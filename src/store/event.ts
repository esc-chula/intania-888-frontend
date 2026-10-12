import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EventState {
  dailyClaimDateByUser: Record<string, string>;
  setDailyClaimDate: (userId: string, date: string | null) => void;
}

export const useEventStore = create<EventState>()(
  persist(
    (set) => ({
      dailyClaimDateByUser: {},
      setDailyClaimDate: (userId, date) =>
        set((state) => {
          const nextClaimDates = { ...state.dailyClaimDateByUser };

          if (date) {
            nextClaimDates[userId] = date;
          } else {
            delete nextClaimDates[userId];
          }

          return { dailyClaimDateByUser: nextClaimDates };
        }),
    }),
    {
      name: "intania-888-daily-reward",
      partialize: (state) => ({
        dailyClaimDateByUser: state.dailyClaimDateByUser,
      }),
    },
  ),
);
