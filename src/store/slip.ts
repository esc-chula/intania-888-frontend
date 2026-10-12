"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import { getMatchById } from "@/api/match/getMatchId";
import { RateString } from "@/types/decimal";
import {
  asRateString,
  DEFAULT_RATE,
  formatCombinedRate,
  rateToMicroUnits,
} from "@/utils/rate";

interface Slip {
  match_id: string;
  rate: RateString;
  betting_on: string;
  date: Date;
  sport_type: string;
  team_a_color: string;
  team_b_color: string;
}

interface SlipStore {
  slipItems: Slip[];
  totalRate: string;
  addSlipItem: (slip: Slip) => void;
  removeSlipItem: (matchId: string) => void;
  updateSlipItem: (matchId: string, updatedSlip: Partial<Slip>) => void;
  updateSlipRates: () => Promise<void>;
  calculateTotalRate: (slips: Slip[]) => string;
}

const effectiveRate = (value: unknown): RateString => {
  const rate = asRateString(value);
  return rateToMicroUnits(rate) === BigInt(0) ? DEFAULT_RATE : rate;
};

export const useSlipStore = create(
  persist<SlipStore>(
    (set, get) => ({
      slipItems: [],
      totalRate: "1.00",
      calculateTotalRate: (slips) =>
        formatCombinedRate(
          slips.map((slip) => slip.rate),
          2,
        ),
      addSlipItem: (slip) =>
        set((state) => {
          const exists = state.slipItems.some(
            (item) => item.match_id === slip.match_id,
          );

          if (exists) {
            toast.error("มีสลิปนี้อยู่แล้วในระบบ!");
            return state;
          }

          if (new Date() >= new Date(slip.date)) {
            toast.error("ไม่สามารถเพิ่มการแข่งขันที่เริ่มแล้วหรือหมดเวลาแล้ว!");
            return state;
          }

          toast.success("เพิ่มลงในสลิปเรียบร้อยแล้ว!");
          const updatedSlips = [...state.slipItems, slip];
          return {
            slipItems: updatedSlips,
            totalRate: get().calculateTotalRate(updatedSlips),
          };
        }),
      removeSlipItem: (matchId) =>
        set((state) => {
          const updatedSlips = state.slipItems.filter(
            (item) => item.match_id !== matchId,
          );

          if (updatedSlips.length < state.slipItems.length) {
            toast.success("สลิปถูกลบเรียบร้อยแล้ว!");
          } else {
            toast.error("ไม่พบสลิปนี้ในระบบ!");
          }

          return {
            slipItems: updatedSlips,
            totalRate: get().calculateTotalRate(updatedSlips),
          };
        }),
      updateSlipItem: (matchId, updatedSlip) => {
        const state = get();
        const slipIndex = state.slipItems.findIndex(
          (item) => item.match_id === matchId,
        );
        if (slipIndex === -1) return;

        const updatedSlips = [...state.slipItems];
        updatedSlips[slipIndex] = {
          ...updatedSlips[slipIndex],
          ...updatedSlip,
        };
        set({
          slipItems: updatedSlips,
          totalRate: get().calculateTotalRate(updatedSlips),
        });

        void getMatchById(matchId).then((match) => {
          if (!match?.success) return;

          const slip = updatedSlips[slipIndex];
          if (slip.betting_on === slip.team_a_color) {
            slip.rate = effectiveRate(match.data.team_a_rate);
          } else if (slip.betting_on === slip.team_b_color) {
            slip.rate = effectiveRate(match.data.team_b_rate);
          }

          set({
            slipItems: updatedSlips,
            totalRate: get().calculateTotalRate(updatedSlips),
          });
        });
      },
      updateSlipRates: async () => {
        const currentTime = new Date();
        const updatedSlips = await Promise.all(
          get().slipItems.map(async (slip) => {
            const matchData = await getMatchById(slip.match_id);
            if (!matchData?.success) return slip;

            const rawRate =
              slip.betting_on === slip.team_a_color
                ? matchData.data.team_a_rate
                : slip.betting_on === slip.team_b_color
                  ? matchData.data.team_b_rate
                  : slip.rate;
            return { ...slip, rate: effectiveRate(rawRate) };
          }),
        );

        const validSlips = updatedSlips.filter(
          (slip) => currentTime < new Date(slip.date),
        );
        if (validSlips.length < updatedSlips.length) {
          toast.error(
            `ลบ ${updatedSlips.length - validSlips.length} การแข่งขันที่หมดเวลาแล้วออกจากสลิป`,
          );
        }

        set({
          slipItems: validSlips,
          totalRate: get().calculateTotalRate(validSlips),
        });
      },
    }),
    {
      name: "slip-storage",
      version: 2,
      migrate: () =>
        ({ slipItems: [], totalRate: "1.00" }) as unknown as SlipStore,
    },
  ),
);
