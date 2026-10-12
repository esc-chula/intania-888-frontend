import { create } from 'zustand';
import { MoneyString } from "@/types/leaderboard";
import { asMoneyString } from "@/utils/money";

interface CoinStore {
  coinPoint: MoneyString;
  setCoinPoint: (value: string) => void;
  clearCoin: () => void;
}

export const useCoinStore = create<CoinStore>((set) => ({
  coinPoint: asMoneyString("0.00"),
  setCoinPoint: (value) => set({ coinPoint: asMoneyString(value) }),
  clearCoin: () => set({ coinPoint: asMoneyString("0.00") }),
}));
