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
    slipItems: Slip[];
    addSlipItem: (slip: Slip) => void;
    removeSlipItem: (match_id: string) => void;
    updateSlipItem: (match_id: string, updatedSlip: Partial<Slip>) => void;
    updateSlipRates: () => void;
}

export const useSlipStore = create(
    persist<SlipStore>(
        (set, get) => ({
            slipItems: [],
            addSlipItem: (slip) =>
                set((state) => {
                    const exists = state.slipItems.some((item) => item.match_id === slip.match_id);
                    
                    if (!exists) {
                        toast.success('เพิ่มลงในสลิปเรียบร้อยแล้ว!'); 
                        return {
                            slipItems: [...state.slipItems, slip],
                        };
                    } else {
                        toast.error('มีสลิปนี้อยู่แล้วในระบบ!');
                        return state;
                    }
                }),
            removeSlipItem: (match_id) =>
                set((state) => {
                    const updatedSlips = state.slipItems.filter((item) => item.match_id !== match_id);
                    
                    if (updatedSlips.length < state.slipItems.length) {
                        toast.success('สลิปถูกลบเรียบร้อยแล้ว!');
                    } else {
                        toast.error('ไม่พบสลิปนี้ในระบบ!');
                    }

                    return {
                        slipItems: updatedSlips,
                    };
                }),
            updateSlipItem: (match_id, updatedSlip) => {
                const state = get();
                const slipIndex = state.slipItems.findIndex((item) => item.match_id === match_id);
                
                if (slipIndex !== -1) {
                    const updatedSlips = [...state.slipItems];
                    updatedSlips[slipIndex] = { ...updatedSlips[slipIndex], ...updatedSlip };
                    getMatchById(updatedSlips[slipIndex].match_id).then((match) => {
                        if (updatedSlips[slipIndex].betting_on == updatedSlips[slipIndex].team_a_color) {
                            updatedSlips[slipIndex].rate = match?.data.team_a_rate || 1;
                        }
                        if (updatedSlips[slipIndex].betting_on == updatedSlips[slipIndex].team_b_color) {
                            updatedSlips[slipIndex].rate = match?.data.team_b_rate || 1;
                        }
                        set({ slipItems: updatedSlips });
                    });
                }
            },
            updateSlipRates: async () => {
                const state = get(); 

                const updatedSlips = await Promise.all(
                    state.slipItems.map(async (slip) => {
                        const matchData = await getMatchById(slip.match_id);

                        if (matchData?.success) {
                            if (slip.rate == 0) {
                                return { ...slip, rate: 1};
                            }
                            
                            const updatedRate = matchData.data.rate || slip.rate; 
                            return { ...slip, rate: updatedRate };
                        }

                        return slip; 
                    })
                );

                set({ slipItems: updatedSlips });
            },
        }),
        {
            name: 'slip-storage', 
        }
    )
);
