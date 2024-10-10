import { create } from 'zustand';
import { getUserCoins } from '@/api/coin/getCoin';

interface CoinStore {
  coinPoint: number;
  refreshCoin: (userId: string) => Promise<void>;
}

export const useCoinStore = create<CoinStore>((set) => ({
  coinPoint: 0,

  refreshCoin: async (userId: string) => {
    try {
      const res = await getUserCoins(userId); 
      set({ coinPoint: res?.data });
    } catch (error) {
      console.error('Error refreshing coins:', error);
    }
  },
}));