"use client";
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
    totalRate: number;
    addSlipItem: (slip: Slip) => void;
    removeSlipItem: (match_id: string) => void;
    updateSlipItem: (match_id: string, updatedSlip: Partial<Slip>) => void;
    updateSlipRates: () => void;
    calculateTotalRate: (slips: Slip[]) => number;
}

export const useSlipStore = create(
    persist<SlipStore>(
        (set, get) => ({
            slipItems: [],
            totalRate: 1,  // Initialize totalRate as 1 because it's a multiplication accumulator
            // Helper function to calculate totalRate
            calculateTotalRate: (slips: Slip[]) => {
                return slips.reduce((acc, slip) => acc * slip.rate, 1);
            },
            addSlipItem: (slip) =>
                set((state) => {
                    const exists = state.slipItems.some((item) => item.match_id === slip.match_id);

                    if (exists) {
                        toast.error('มีสลิปนี้อยู่แล้วในระบบ!');
                        return state;
                    }

                    const currentTime = new Date();
                    const matchStartTime = new Date(slip.date);

                    if (currentTime >= matchStartTime) {
                        toast.error('ไม่สามารถเพิ่มการแข่งขันที่เริ่มแล้วหรือหมดเวลาแล้ว!');
                        return state;
                    }

                    toast.success('เพิ่มลงในสลิปเรียบร้อยแล้ว!');
                    const updatedSlips = [...state.slipItems, slip];
                    return {
                        slipItems: updatedSlips,
                        totalRate: get().calculateTotalRate(updatedSlips), 
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
                        totalRate: get().calculateTotalRate(updatedSlips), // Update totalRate
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
                            updatedSlips[slipIndex].rate = match?.data.team_a_rate || 2;
                        }
                        if (updatedSlips[slipIndex].betting_on == updatedSlips[slipIndex].team_b_color) {
                            updatedSlips[slipIndex].rate = match?.data.team_b_rate || 2;
                        }
                        set({ 
                            slipItems: updatedSlips,
                            totalRate: get().calculateTotalRate(updatedSlips), // Update totalRate
                        });
                    });
                }
            },

            updateSlipRates: async () => {
                const state = get();
                const currentTime = new Date();

                const updatedSlips = await Promise.all(
                    state.slipItems.map(async (slip) => {
                        const matchData = await getMatchById(slip.match_id);

                        if (matchData?.success) {
                            const newRate = slip.betting_on === slip.team_a_color
                                ? matchData.data.team_a_rate
                                : slip.betting_on === slip.team_b_color
                                ? matchData.data.team_b_rate
                                : slip.rate;

                            return { ...slip, rate: newRate || 2 };
                        }

                        return slip;
                    })
                );

                const validSlips = updatedSlips.filter((slip) => {
                    const matchStartTime = new Date(slip.date);
                    return currentTime < matchStartTime;
                });

                if (validSlips.length < updatedSlips.length) {
                    const removedCount = updatedSlips.length - validSlips.length;
                    toast.error(`ลบ ${removedCount} การแข่งขันที่หมดเวลาแล้วออกจากสลิป`);
                }

                set({
                    slipItems: validSlips,
                    totalRate: get().calculateTotalRate(validSlips),
                });
            },
        }),
        {
            name: 'slip-storage', 
        }
    )
);