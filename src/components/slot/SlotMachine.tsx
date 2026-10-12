"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Coins } from "lucide-react";
import Lever from "./Lever";
import Reel from "./Reel";
import toast from "react-hot-toast";
import { useCoinStore } from "@/store/coin";
import {
  asMoneyString,
  compareMoneyStrings,
} from "@/utils/money";
import { apiClient } from "@/api/axios";
import { getSlot } from "@/api/event/slot";
import {
  GetSlotResponse,
  SpinData,
  StealToken,
  SpinCandidate,
} from "@/api/event/slot";
import RaidModal, { RaidCandidate } from "./RaidModal";
import useAuth from "@/hooks/useAuth";

type RaidResponse = {
  total_stolen: string;
  raider_new_balance: string;
  all_candidates: Array<{
    index: number;
    user_id: string;
    name: string;
    role_id: string;
    group_id: string | null;
    balance_before: string;
    amount_stolen: string;
    was_chosen: boolean;
  }>;
  message: string;
};

const SlotMachine = () => {
  const { refreshSession } = useAuth();
  const currentCoin = useCoinStore((s) => s.coinPoint);

  const reelLength = 100;
  const symbols = useMemo(() => ["🍇", "🍎", "🍐", "🍊", "💰", "👽"], []);

  const [reels, setReels] = useState<string[][]>([[], [], []]);
  const [spinning, setSpinning] = useState<[boolean, boolean, boolean]>([
    false,
    false,
    false,
  ]);
  const spinTransactionRef = useRef(false);
  const [isSpinTransactionActive, setIsSpinTransactionActive] = useState(false);
  const [betAmount, setBetAmount] = useState<50 | 100 | 500>(50);

  const [raidOpen, setRaidOpen] = useState(false);
  const [raidCandidates, setRaidCandidates] = useState<RaidCandidate[]>([]);
  const [stealToken, setStealToken] = useState<StealToken | null>(null);
  const [raidRevealed, setRaidRevealed] = useState(false);
  const [raidAmountsByIndex, setRaidAmountsByIndex] = useState<
    Record<number, number> | undefined
  >(undefined);
  const [raidChosenIndex, setRaidChosenIndex] = useState<number | undefined>(
    undefined
  );

  // for testing purpose: set NEXT_PUBLIC_FORCE_ALIEN=1 or add ?forceRaid=1 to URL
  // const isForceAliens = (() => {
  //     if (process.env.NODE_ENV === 'production') return false;
  //     if (typeof window !== 'undefined') {
  //         const sp = new URLSearchParams(window.location.search);
  //         if (sp.get('forceRaid') === '1') return true;
  //     }
  //     return process.env.NEXT_PUBLIC_FORCE_ALIEN === '1';
  // })();
  // const isForceAliens = false;

  const generateReelSymbols = useCallback((): string[] => {
    const reel: string[] = [];
    for (let i = 0; i < reelLength; i++) {
      reel.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }
    return reel;
  }, [reelLength, symbols]);

  useEffect(() => {
    setReels([
      generateReelSymbols(),
      generateReelSymbols(),
      generateReelSymbols(),
    ]);
  }, [generateReelSymbols]);

  const fetchResultFromAPI = async (): Promise<SpinData | undefined> => {
    // Dev forcing disabled
    // if (isForceAliens) {
    //     const mock: SpinData = {
    //         reward: 0,
    //         slots: ['👽', '👽', '👽'],
    //         stealToken: {
    //             token: 'dev-mock-token',
    //             expires_at: new Date(Date.now() + 60_000).toISOString(),
    //             victim_count: 3,
    //             message: 'DEV MOCK: token is not valid against backend',
    //         },
    //                 candidates: [
    //                     { index: 0, name: 'ผู้เล่น A', role_id: '2', group_id: '1' },
    //                     { index: 1, name: 'ผู้เล่น B', role_id: '2', group_id: '2' },
    //                     { index: 2, name: 'ผู้เล่น C', role_id: '2', group_id: '3' },
    //                 ],
    //     };
    //     await new Promise((r) => setTimeout(r, 3000));
    //     return mock;
    // }
    try {
      const result = await new Promise<GetSlotResponse | undefined>(
        (resolve) => {
          setTimeout(async () => {
            const apiResult = await getSlot(betAmount);
            resolve(apiResult);
          }, 3000);
        }
      );
      if (result?.success && result.data) return result.data;
    } catch (e) {
      console.error(e);
    }
    return undefined;
  };

  const stopSpin = (
    reelIndex: number,
    delay: number,
    resultSymbol: string,
  ): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(() => {
        setSpinning((prev) => {
          const next = [...prev] as [boolean, boolean, boolean];
          next[reelIndex] = false;
          return next;
        });
        setReels((prev) => {
          const next = [...prev];
          next[reelIndex] = [resultSymbol];
          return next;
        });
        resolve();
      }, delay);
    });

  const stopReelsOnResult = async (
    resultSymbols: string[],
    apiReward: string,
    token?: StealToken,
    candidates?: SpinCandidate[]
  ) => {
    await Promise.all([
      stopSpin(0, 1000, resultSymbols[0]),
      stopSpin(1, 2000, resultSymbols[1]),
      stopSpin(2, 3000, resultSymbols[2]),
    ]);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isAlienJackpot =
      resultSymbols.length === 3 && resultSymbols.every((s) => s === "👽");
    if (isAlienJackpot && token && candidates && candidates.length === 3) {
      setRaidCandidates(
        candidates.map((c) => ({
          index: c.index,
          name: c.name,
          group_id: c.group_id,
        }))
      );
      setStealToken(token);
      setRaidRevealed(false);
      setRaidAmountsByIndex(undefined);
      setRaidChosenIndex(undefined);
      setRaidOpen(true);
      return;
    }

    if (apiReward === "0.00") {
      toast.error("เสียใจด้วย คุณไม่ได้รับเหรียญรางวัลในรอบนี้");
    } else {
      toast.success(
        `ยินดีด้วย! คุณได้รับเหรียญรางวัลจำนวน ${apiReward} เหรียญ`
      );
    }
    await refreshSession();
  };

  const spin = async () => {
    if (spinTransactionRef.current) return;

    if (
      compareMoneyStrings(currentCoin, asMoneyString(betAmount.toFixed(2))) < 0
    ) {
      toast.error("เงินของคุณไม่เพียงพอ");
      return;
    }

    spinTransactionRef.current = true;
    setIsSpinTransactionActive(true);
    setReels([
      generateReelSymbols(),
      generateReelSymbols(),
      generateReelSymbols(),
    ]);
    setSpinning([true, true, true]);

    try {
      const result = await fetchResultFromAPI();
      if (!result) {
        setSpinning([false, false, false]);
        toast.error("ไม่สามารถหมุนสล็อตได้ กรุณาลองใหม่อีกครั้ง");
        return;
      }

      await stopReelsOnResult(
        result.slots,
        result.reward,
        result.stealToken,
        result.candidates
      );
    } finally {
      spinTransactionRef.current = false;
      setIsSpinTransactionActive(false);
    }
  };

  const handleRaidConfirm = async (victimIndex: number) => {
    // if (isForceAliens) {
    //     toast.success(`ขโมยสำเร็จ! (โหมดทดสอบ) เลือกเป้าหมาย index ${victimIndex}`);
    //     const mockMap: Record<number, number> = {};
    //     raidCandidates.forEach((c, i) => {
    //         const val = (i + 1) * 111.11;
    //         mockMap[c.index] = Number(val.toFixed(2));
    //     });
    //     setRaidAmountsByIndex(mockMap);
    //     setRaidRevealed(true);
    //     await refreshSession();
    //     return;
    // }
    if (!stealToken) return;
    try {
      const res = await apiClient.post("/events/use-steal-token", {
        token: stealToken.token,
        victim_index: victimIndex,
      });
      const data = res.data as RaidResponse;
      toast.success(
        data.message ||
          `ขโมยสำเร็จ! ได้รับ ${data.total_stolen} เหรียญ`
      );
      // map revealed amounts to amount_stolen and capture chosen index
      const map: Record<number, number> = {};
      let chosenIdx: number | undefined = undefined;
      data.all_candidates.forEach((cand) => {
        map[cand.index] = Number(cand.amount_stolen);
        if (cand.was_chosen) chosenIdx = cand.index;
      });
      setRaidAmountsByIndex(Object.keys(map).length ? map : undefined);
      setRaidRevealed(true);
      setRaidChosenIndex(chosenIdx);
      await refreshSession();
    } catch (e: unknown) {
      let errMsg = "เกิดข้อผิดพลาดในการ Raid";
      const err = e as { response?: { data?: { error?: string } } };
      if (err?.response?.data?.error) errMsg = err.response.data.error;
      toast.error(errMsg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex items-center flex-col space-y-2 py-4">
        <Image
          src={"/logos/slotMessage.svg"}
          alt="slotMessage"
          width={200}
          height={50}
        />
        <p className="text-white font-semibold text-xs">
          หมุนสล็อตเพื่อลุ้นรับเหรียญรางวัล ขอให้โชคดี!
        </p>
      </div>

      <div className="flex items-center justify-center space-x-6">
        <div
          className="flex items-center justify-center p-3 bg-yellow-400 rounded-lg shadow-2xl"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #A2790D 80%)",
          }}
        >
          <div
            className="flex space-x-4 bg-white rounded-lg border-8 p-5"
            style={{ borderColor: "#68141C" }}
          >
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
          <Lever onPullEnd={spin} disabled={isSpinTransactionActive} />
        </div>
      </div>

      <p className="text-white font-semibold text-xs">
        เลือกจำนวนเงินที่ใช้ในการหมุน
      </p>

      <div className="flex items-center justify-center space-x-1.5">
        <button
          onClick={() => setBetAmount(50)}
          disabled={isSpinTransactionActive}
          className={`rounded-md w-20 h-8 font-extrabold text-base flex items-center justify-center ${
            betAmount === 50 ? "text-black" : "text-gray-600"
          }`}
          style={{
            background:
              betAmount === 50
                ? "linear-gradient(180deg, #FFFFFF 0%, #A2790D 80%)"
                : "#FFFFFF",
          }}
        >
          50
          <Coins color={betAmount === 50 ? "yellow" : "gray"} />
        </button>

        <button
          onClick={() => setBetAmount(100)}
          disabled={isSpinTransactionActive}
          className={`rounded-md w-20 h-8 font-extrabold text-base flex items-center justify-center ${
            betAmount === 100 ? "text-black" : "text-gray-600"
          }`}
          style={{
            background:
              betAmount === 100
                ? "linear-gradient(180deg, #FFFFFF 0%, #A2790D 80%)"
                : "#FFFFFF",
          }}
        >
          100
          <Coins color={betAmount === 100 ? "yellow" : "gray"} />
        </button>

        <button
          onClick={() => setBetAmount(500)}
          disabled={isSpinTransactionActive}
          className={`rounded-md w-20 h-8 font-extrabold text-base flex items-center justify-center ${
            betAmount === 500 ? "text-black" : "text-gray-600"
          }`}
          style={{
            background:
              betAmount === 500
                ? "linear-gradient(180deg, #FFFFFF 0%, #A2790D 80%)"
                : "#FFFFFF",
          }}
        >
          500
          <Coins color={betAmount === 500 ? "yellow" : "gray"} />
        </button>
      </div>

      <button
        onClick={spin}
        disabled={isSpinTransactionActive}
        aria-busy={isSpinTransactionActive}
        className={`text-white text-base flex items-center justify-center font-semibold w-32 h-10 rounded-md ${
          isSpinTransactionActive
            ? "cursor-not-allowed opacity-60"
            : "hover:opacity-90"
        }`}
        style={{ backgroundColor: "#68141C" }}
      >
        {isSpinTransactionActive ? "กำลังหมุน..." : "หมุนเลย!"}
      </button>

      <RaidModal
        isOpen={raidOpen}
        candidates={raidCandidates}
        onClose={async () => {
          setRaidOpen(false);
          setStealToken(null);
          setRaidRevealed(false);
          setRaidAmountsByIndex(undefined);
          setRaidChosenIndex(undefined);
          if (raidCandidates.length === 0) {
            toast("ไม่พบบุคคลที่สามารถ Raid ได้ในตอนนี้", { icon: "👀" });
          }
          await refreshSession();
        }}
        onConfirm={handleRaidConfirm}
        revealed={raidRevealed}
        amountsByIndex={raidAmountsByIndex}
        chosenIndex={raidChosenIndex}
      />
    </div>
  );
};

export default SlotMachine;
