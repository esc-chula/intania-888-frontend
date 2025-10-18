// Grid.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Mine from "./Mine";
import {
  cashOut,
  createGame,
  getActive,
  MineType,
  revealTile,
} from "@/api/event/stakemine";
import { Coins } from "lucide-react";
import { useCoinStore } from "@/store/coin";
import toast from "react-hot-toast";

type Cell = {
  revealed: boolean;
  type: MineType;
};

const GRID_SIZE = 16; // 4x4

const createEmptyGrid = (size = GRID_SIZE): Cell[] =>
  Array.from({ length: size }, () => ({
    revealed: false,
    type: "hidden" as MineType,
  }));

const MineTable: React.FC = () => {
  const refreshCoin = useCoinStore((s) => s.refreshCoin);
  const currentCoin = useCoinStore((s) => s.coinPoint);

  const [isPlaying, setIsPlaying] = useState(false);
  const [betAmount, setBetAmount] = useState<number>(100);
  const [gameId, setGameId] = useState<string>("");
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [payout, setPayout] = useState<number>(0);
  const [mode, setMode] = useState<string>("low");
  const [grid, setGrid] = useState<Cell[]>(() => createEmptyGrid());

  const restoreGridFromApi = useCallback((apiGrid: { type: MineType }[]) => {
    const restored = Array.from({ length: GRID_SIZE }, (_, i) => {
      const apiCell = apiGrid?.[i];
      return {
        revealed: apiCell?.type !== "hidden",
        type: apiCell?.type ?? ("hidden" as MineType),
      };
    });
    setGrid(restored);
  }, []);

  // --- load active game on mount ---
  const loadActiveGame = async () => {
    try {
      const result = await getActive();

      if (result?.success && result.data) {
        const activeGame = result.data;
        setIsPlaying(true);
        setGameId(activeGame.id);
        setBetAmount(activeGame.bet_amount);
        restoreGridFromApi(activeGame.grid);
        toast.success("โหลดเกมที่ยังเล่นไม่จบเรียบร้อยแล้ว");
        return;
      }

      if (result && result.data?.status === 404) {
        console.debug("No active game found.");
        return;
      }
    } catch (err) {
      console.error("Error loading active game:", err);
      toast.error("ไม่สามารถโหลดเกมได้");
    }
  };

  useEffect(() => {
    loadActiveGame();
  }, []);

  const startGame = useCallback(async () => {
    if (currentCoin < betAmount) {
      toast.error("เงินของคุณไม่เพียงพอ");
      return;
    }

    try {
      if (!isPlaying) {
        setGrid(createEmptyGrid());
        const result = await createGame(betAmount, mode);

        if (result?.success && result.data) {
          setIsPlaying(true);
          setGameId(result.data.id);
          setMultiplier(result.data.multiplier ?? 1.0);
          setPayout(result.data.current_payout ?? 0);
        }
      }
    } catch (err) {
      console.error("startGame error:", err);
      toast.error("ไม่สามารถเริ่มเกมได้");
    }
  }, [betAmount, currentCoin, isPlaying, mode]);

  const endGame = useCallback(
    async (apiGrid: { type: MineType }[]) => {
      try {
        setGrid((prev) => {
          const next = [...prev];
          for (let i = 0; i < Math.min(apiGrid.length, next.length); i++) {
            next[i] = {
              ...next[i],
              revealed: true,
              type: apiGrid[i].type === "diamond" ? "diamond" : "bomb",
            };
          }
          return next;
        });

        setIsPlaying(false);
        await refreshCoin();
      } catch (err) {
        console.error("endGame error:", err);
      }
    },
    [refreshCoin]
  );

  const revealFromApi = useCallback(
    async (index: number): Promise<"diamond" | "bomb" | undefined> => {
      try {
        const apiResult = await revealTile(index, gameId);
        if (apiResult?.success && apiResult.data) {
          const game = apiResult.data.game;

          if (game.multiplier != null) setMultiplier(game.multiplier);
          if (game.current_payout != null) setPayout(game.current_payout);

          const isTerminal =
            game.status === "lost" ||
            game.status === "won" ||
            game.grid?.[index]?.type === "bomb";

          if (isTerminal) {
            await endGame(game.grid);

            if (game.status === "won") {
              toast.success("คุณชนะแล้ว! 🎉");
            } else if (game.grid?.[index]?.type === "bomb") {
              toast.error("คุณแพ้แล้ว! 💣");
            }

            return game.grid?.[index]?.type === "bomb" ? "bomb" : "diamond";
          }

          return "diamond";
        }
      } catch (err) {
        console.error("revealFromApi error:", err);
        toast.error("ไม่สามารถเปิดช่องได้");
      }
      return undefined;
    },
    [gameId, endGame]
  );

  const handleToggle = useCallback(
    async (index: number) => {
      if (!isPlaying) return;

      try {
        const result = await revealFromApi(index);

        if (result) {
          setGrid((prev) => {
            const next = [...prev];
            next[index] = {
              revealed: true,
              type: result,
            };
            return next;
          });
        }
      } catch (err) {
        console.error("handleToggle error:", err);
      }
    },
    [isPlaying, revealFromApi]
  );

  const quit = useCallback(async () => {
    if (!gameId) return;
    try {
      const resp = await cashOut(gameId);
      if (resp?.success && resp.data?.game) {
        await endGame(resp.data.game.grid);
        setIsPlaying(false);
        await refreshCoin();
        toast.success("ถอนสำเร็จ!");
      }
    } catch (err) {
      console.error("quit error:", err);
      toast.error("ถอนเงินไม่สำเร็จ");
    }
  }, [endGame, gameId, refreshCoin]);

  const betButtons = useMemo(
    () => [100, 500, 1000],
    []
  );

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex flex-col items-center space-y-2 py-4">
        <p
          className="text-2xl font-bold bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(180deg, #FFFFFF 0%, #A2790D 80%)",
          }}
        >
          เหมืองนำโชค
        </p>

        <p className="text-white font-semibold text-xs text-center">
          รับเหรียญรางวัลมหาศาลจากเพชรในเหมืองนี้ — ระวังระเบิดในเหมืองให้ดี!
        </p>

        <label className="text-white font-semibold text-xs mb-2">ระดับความยาก</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="w-2/4 px-4 py-2 bg-white text-black rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="low">Easy</option>
          <option value="medium">Medium</option>
          <option value="high">Hard</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {grid.map((cell, index) => (
          <Mine
            key={index}
            revealed={cell.revealed}
            type={cell.type}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>

      {isPlaying ? (
        <>
          <p className="text-white font-semibold text-xs">สถานะเกม</p>
          <div className="flex items-center justify-center space-x-1.5">
            <div className="rounded-md w-24 h-8 font-extrabold text-sm flex items-center justify-center bg-white text-black">
              {multiplier.toFixed(2)}
            </div>
            <div className="rounded-md w-24 h-8 font-extrabold text-sm flex items-center justify-center bg-white text-black">
              {payout.toFixed(2)}
              <Coins color={"yellow"} />
            </div>
          </div>

          <button
            onClick={quit}
            className="text-white text-base flex items-center justify-center font-semibold w-32 h-10 rounded-md"
            style={{ backgroundColor: "#68141C" }}
          >
            ถอนเงิน!
          </button>
        </>
      ) : (
        <>
          <p className="text-white font-semibold text-xs">เลือกจำนวนเงินที่ใช้ในการเล่น</p>

          <div className="flex items-center justify-center space-x-1.5">
            {betButtons.map((amt) => {
              const selected = betAmount === amt;
              return (
                <button
                  key={amt}
                  onClick={() => setBetAmount(amt)}
                  className={`rounded-md w-20 h-8 font-extrabold text-base flex items-center justify-center ${
                    selected ? "text-black" : "text-gray-600"
                  }`}
                  style={{
                    background: selected
                      ? "linear-gradient(180deg, #FFFFFF 0%, #A2790D 80%)"
                      : "#FFFFFF",
                  }}
                >
                  {amt}
                  <Coins color={selected ? "yellow" : "gray"} />
                </button>
              );
            })}
          </div>

          <button
            onClick={startGame}
            className="text-white text-base flex items-center justify-center font-semibold w-32 h-10 rounded-md"
            style={{ backgroundColor: "#68141C" }}
          >
            เล่นเลย!
          </button>
        </>
      )}
    </div>
  );
};

export default MineTable;
