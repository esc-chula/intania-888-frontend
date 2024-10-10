"use client";
import { useState, useEffect } from 'react';
import Lever from './Lever';
import Reel from './Reel';
import Image from 'next/image';
import { Coins } from 'lucide-react';
import { getSlot } from '@/api/event/slot';
import { GetSlotResponse } from '@/api/event/slot';
import toast from 'react-hot-toast';
import { apiClient } from '@/api/axios';
import { useCoinStore } from '@/store/coin';

const SlotMachine = () => {
    const refreshCoin = useCoinStore((state) => state.refreshCoin);
    const reelLength = 100;
    const symbols = ['🍉', '🍋', '🍇', '🍒', '⭐', '🔔'];

    const generateReelSymbols = () => {
        let reel = [];
        for (let i = 0; i < reelLength; i++) {
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            reel.push(randomSymbol);
        }
        return reel;
    };

    const [reels, setReels] = useState<string[][]>([[], [], []]); 
    const [spinning, setSpinning] = useState([false, false, false]);
    const [betAmount, setBetAmount] = useState(50);
    const [reward, setReward] = useState(0);
    const [spinSpeed, setSpinSpeed] = useState([3, 3, 3]);
    const [id, setId] = useState('');
    useEffect(() => {
        const fetchId = async () => {
            const myId = (await apiClient.get("/auth/me")).data.profile.id;
            setId(myId);
        }
        fetchId();
        setReels([generateReelSymbols(), generateReelSymbols(), generateReelSymbols()]);
    }, []);

    const spin = async () => {
        if (spinning.some((spin) => spin)) return; 
        refreshCoin(id);
        setReels([generateReelSymbols(), generateReelSymbols(), generateReelSymbols()]);

        // Start slow spin for all reels
        setSpinning([true, true, true]);
        setSpinSpeed([10, 10, 10]); 

        // Fetch result from API
        const result = await fetchResultFromAPI();

        if (result) {
            setReward(result.reward);

            setTimeout(() => {
                setSpinSpeed([100, 100, 100]); 
            }, 1000);

            stopReelsOnResult(result.slots, result.reward);
        }
    };


    const fetchResultFromAPI = async (): Promise<{ reward: number; slots: string[] } | undefined> => {
        try {
            const result = await new Promise<GetSlotResponse | undefined>((resolve) => {
                setTimeout(async () => {
                    const apiResult = await getSlot(betAmount);
                    resolve(apiResult);
                }, 3000); 
            });

            if (result?.success) {
                return { reward: result.data?.reward || 0, slots: result.data?.slots || [] };
            }
        } catch (error) {
            console.error(error);
            return undefined;
        }
    };

    const stopReelsOnResult = (resultSymbols: string[], apiReward: number) => {
        stopSpin(0, 1000, resultSymbols[0]);
        stopSpin(1, 2000, resultSymbols[1]); 
        stopSpin(2, 3000, resultSymbols[2], () => {
            setTimeout(() => {
                if (apiReward === 0) {
                    toast.error('เสียใจด้วย คุณไม่ได้รับเหรียญรางวัลในรอบนี้');
                } else {
                    refreshCoin(id);
                    toast.success(`ยินดีด้วย! คุณได้รับเหรียญรางวัลจำนวน ${apiReward} เหรียญ`);
                }
            }, 1000); 
        });
    };

    const stopSpin = (reelIndex: number, delay: number, resultSymbol: string, onComplete?: () => void) => {
        setTimeout(() => {
            setSpinning((prev) => {
                const newSpinning = [...prev];
                newSpinning[reelIndex] = false;
                return newSpinning;
            });

            setSpinSpeed((prev) => {
                const newSpeed = [...prev];
                newSpeed[reelIndex] = 1; 
                return newSpeed;
            });

            setReels((prev) => {
                const newReels = [...prev];
                newReels[reelIndex] = [resultSymbol]; 
                return newReels;
            });

            if (onComplete) {
                onComplete();
            }
        }, delay);
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className='flex items-center flex-col space-y-2 py-4'>
                <Image src={'/logos/slotMessage.svg'} alt="slotMessage" width={200} height={50} />
                <p className='text-white font-semibold text-xs'>หมุนสล็อตให้ได้ถุงเงินเพื่อรับเหรียญรางวัล ขอให้โชคดี!</p>
            </div>

            <div className='flex items-center justify-center space-x-6'>
                <div className="flex items-center justify-center p-3 bg-yellow-400 rounded-lg shadow-2xl"
                    style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #A2790D 80%)' }}>
                    <div className="flex space-x-4 bg-white rounded-lg border-8 p-5" style={{ borderColor: '#68141C' }}>
                        {reels.map((reelSymbols, index) => (
                            <Reel
                                key={index}
                                reelSymbols={reelSymbols}
                                spinning={spinning[index]}
                            />
                        ))}
                    </div>
                </div>

                {/* Lever */}
                <div className="ml-6 flex flex-col items-center justify-center">
                    <Lever onPullEnd={spin} />
                </div>
            </div>

            <p className='text-white font-semibold text-xs'>เลือกจำนวนเงินที่ใช้ในการหมุน</p>

            <div className='flex items-center justify-center space-x-1.5'>
                <button
                    onClick={() => setBetAmount(50)}
                    className={`rounded-md w-20 h-8 font-extrabold text-base flex items-center justify-center ${betAmount === 50 ? 'text-black' : 'text-gray-600'}`}
                    style={{ background: betAmount === 50 ? 'linear-gradient(180deg, #FFFFFF 0%, #A2790D 80%)' : '#FFFFFF' }}>
                    50
                    <Coins color={betAmount === 50 ? 'yellow' : 'gray'} />
                </button>

                <button
                    onClick={() => setBetAmount(100)}
                    className={`rounded-md w-20 h-8 font-extrabold text-base flex items-center justify-center ${betAmount === 100 ? 'text-black' : 'text-gray-600'}`}
                    style={{ background: betAmount === 100 ? 'linear-gradient(180deg, #FFFFFF 0%, #A2790D 80%)' : '#FFFFFF' }}>
                    100
                    <Coins color={betAmount === 100 ? 'yellow' : 'gray'} />
                </button>

                <button
                    onClick={() => setBetAmount(500)}
                    className={`rounded-md w-20 h-8 font-extrabold text-base flex items-center justify-center ${betAmount === 500 ? 'text-black' : 'text-gray-600'}`}
                    style={{ background: betAmount === 500 ? 'linear-gradient(180deg, #FFFFFF 0%, #A2790D 80%)' : '#FFFFFF' }}>
                    500
                    <Coins color={betAmount === 500 ? 'yellow' : 'gray'} />
                </button>
            </div>

            <button
                onClick={spin}
                className="text-white text-base flex items-center justify-center font-semibold w-32 h-10 rounded-md"
                style={{ backgroundColor: '#68141C' }}>
                หมุนเลย!
            </button>

        </div>
    );
};

export default SlotMachine;
