import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import { getMatchById } from '@/api/match/getMatchId';

interface Slip {
    match_id: string;
    rate: number;
    betting_on: string;
    date: Date;
    sport_type: string;
    team_a_color: string;
    team_b_color: string;
}

interface SlipStore {
    _slipItems: Slip[];  
    slipItems: Slip[];  
    totalRate: number;
    addSlipItem: (slip: Slip) => void;
    removeSlipItem: (match_id: string) => void;
    updateSlipItem: (match_id: string, updatedSlip: Partial<Slip>) => void;
    refreshSlipRates: () => Promise<void>;
    calculateTotalRate: (slips: Slip[]) => number;
}

export const useSlipStore = create(
    persist<SlipStore>(
        (set, get) => ({
            _slipItems: [],  
            totalRate: 1, 
            calculateTotalRate: (slips: Slip[]) => {
                return slips.reduce((acc, slip) => acc * slip.rate, 1);
            },

            get slipItems() {
                get().refreshSlipRates();
                return get()._slipItems; 
            },

            addSlipItem: (slip) =>
                set((state) => {
                    const exists = state._slipItems.some((item) => item.match_id === slip.match_id);

                    if (!exists) {
                        toast.success('เพิ่มลงในสลิปเรียบร้อยแล้ว!'); 
                        const updatedSlips = [...state._slipItems, slip];
                        return {
                            _slipItems: updatedSlips,
                            totalRate: get().calculateTotalRate(updatedSlips),
                        };
                    } else {
                        toast.error('มีสลิปนี้อยู่แล้วในระบบ!');
                        return state;
                    }
                }),

            removeSlipItem: (match_id) =>
                set((state) => {
                    const updatedSlips = state._slipItems.filter((item) => item.match_id !== match_id);

                    if (updatedSlips.length < state._slipItems.length) {
                        toast.success('สลิปถูกลบเรียบร้อยแล้ว!');
                    } else {
                        toast.error('ไม่พบสลิปนี้ในระบบ!');
                    }

                    return {
                        _slipItems: updatedSlips,
                        totalRate: get().calculateTotalRate(updatedSlips), 
                    };
                }),

            updateSlipItem: (match_id, updatedSlip) => {
                const state = get();
                const slipIndex = state._slipItems.findIndex((item) => item.match_id === match_id);

                if (slipIndex !== -1) {
                    const updatedSlips = [...state._slipItems];
                    updatedSlips[slipIndex] = { ...updatedSlips[slipIndex], ...updatedSlip };
                    getMatchById(updatedSlips[slipIndex].match_id).then((match) => {
                        if (updatedSlips[slipIndex].betting_on == updatedSlips[slipIndex].team_a_color) {
                            updatedSlips[slipIndex].rate = match?.data.team_a_rate || 2;
                        }
                        if (updatedSlips[slipIndex].betting_on == updatedSlips[slipIndex].team_b_color) {
                            updatedSlips[slipIndex].rate = match?.data.team_b_rate || 2;
                        }
                        set({ 
                            _slipItems: updatedSlips,
                            totalRate: get().calculateTotalRate(updatedSlips), 
                        });
                    });
                }
            },

            // Refresh the rates of all slip items
            refreshSlipRates: async () => {
                const state = get(); 

                const updatedSlips = await Promise.all(
                    state._slipItems.map(async (slip) => {
                        const matchData = await getMatchById(slip.match_id);

                        if (matchData?.success) {
                            const updatedRate = matchData.data.rate || slip.rate;
                            return { ...slip, rate: updatedRate };
                        }

                        return slip; 
                    })
                );

                set({
                    _slipItems: updatedSlips,
                    totalRate: get().calculateTotalRate(updatedSlips),
                });
            },
        }),
        {
            name: 'slip-storage', 
        }
    )
);
