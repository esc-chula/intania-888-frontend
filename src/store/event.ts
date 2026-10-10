import { create } from "zustand";

interface EventState {
  dailyClaimDateByUser: Record<string, string>;
  setDailyClaimDate: (userId: string, date: string | null) => void;
}

export const useEventStore = create<EventState>((set) => ({
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
}));
