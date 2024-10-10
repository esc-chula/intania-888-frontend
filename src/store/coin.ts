import { create } from 'zustand';
import { getUserCoins } from '@/api/coin/getCoin';
import { apiClient } from '@/api/axios';

interface CoinStore {
  coinPoint: number;
  refreshCoin: () => Promise<{ success: boolean }>;
}

export const useCoinStore = create<CoinStore>((set) => ({
  coinPoint: 0,
  refreshCoin: async () => {
    try {
      const myId = (await apiClient.get("/auth/me")).data.profile.id;
      const res = await getUserCoins(myId); 
      set({ coinPoint: res?.data });
      return { success: true };
    } catch (error) {
      console.error('Error refreshing coins:', error);
    return { success: false };
    }
  },
}));