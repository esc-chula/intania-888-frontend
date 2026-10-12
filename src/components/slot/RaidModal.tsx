"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Coins } from "lucide-react";
import { groupToColorMap } from "@/constant/teamColor";

export interface RaidCandidate {
  index: number;
  name: string;
  group_id: string | null;
}

interface RaidModalProps {
  isOpen: boolean;
  candidates: RaidCandidate[];
  onClose: () => void;
  onConfirm: (victimIndex: number) => Promise<void> | void;
  revealed?: boolean;
  amountsByIndex?: Record<number, number>;
  chosenIndex?: number;
}

const groupToThaiColor: Record<string, { label: string; className: string }> = {
  VIOLET: { label: "สีม่วง", className: "text-violet-500" },
  BLUE: { label: "สีฟ้า", className: "text-blue-500" },
  RED: { label: "สีแดง", className: "text-red-500" },
  GREEN: { label: "สีเขียว", className: "text-green-500" },
  PINK: { label: "สีชมพู", className: "text-pink-500" },
  ORANGE: { label: "สีส้ม", className: "text-orange-600" },
  NONE: { label: "สี...", className: "text-gray-400" },
};

const formatAmount = (n: number) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const RaidModal: React.FC<RaidModalProps> = ({
  isOpen,
  candidates,
  onClose,
  onConfirm,
  revealed = false,
  amountsByIndex,
  chosenIndex,
}) => {
  const MAX_TIME = 60;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(MAX_TIME);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSecondsLeft(MAX_TIME);
    setSelectedIndex(null);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (secondsLeft <= 0) {
      onClose();
      return;
    }
    const t = setInterval(
      () => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)),
      1000
    );
    return () => clearInterval(t);
  }, [isOpen, secondsLeft, onClose]);

  const enriched = useMemo(
    () =>
      candidates.map((c) => {
        const colorKey = c.group_id
          ? groupToColorMap[c.group_id] || "NONE"
          : "NONE";
        const meta = groupToThaiColor[colorKey];
        return {
          ...c,
          colorKey,
          colorLabel: meta.label,
          colorClass: meta.className,
        };
      }),
    [candidates]
  );

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (selectedIndex === null || selectedIndex === undefined) return;
    try {
      setSubmitting(true);
      await onConfirm(selectedIndex);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        className="w-full max-w-4xl md:max-w-5xl bg-white border rounded-2xl shadow-2xl overflow-y-auto relative"
        style={{ borderColor: "rgb(104, 20, 28)", maxHeight: "85vh" }}
      >
        {/* Header (dark red/carmine) */}
        <div
          className="w-full px-6 sm:px-10 py-6"
          style={{ backgroundColor: "rgb(104, 20, 28)" }}
        >
          <div className="text-center">
            <h1 className="font-black text-white mb-2 underline text-[1rem]">
              ยินดีด้วย !
            </h1>
            <p className="text-white text-[0.65rem] font-bold">
              คุณได้สิทธิขโมย! สามารถเลือกขโมยเหรียญของผู้เล่น 1 ใน 3
              คนนี้ได้เลย
            </p>
          </div>
        </div>

        {/* Body (white) */}
        <div className="px-6 sm:px-10 py-6">
          {enriched.length > 0 ? (
            <div className="grid grid-cols-3 gap-5 sm:gap-4 mb-6">
              {enriched.map((p) => (
                <button
                  key={p.index}
                  disabled={revealed}
                  aria-disabled={revealed}
                  onClick={() => {
                    if (!revealed) setSelectedIndex(p.index);
                  }}
                  className={`relative flex flex-col items-center justify-between p-2 sm:p-4 rounded-xl transition-all duration-200 shadow-lg border-4 text-left h-full ${
                    selectedIndex === p.index && !revealed
                      ? "bg-yellow-100 border-yellow-500 scale-[1.02]"
                      : "bg-white border-transparent hover:border-yellow-300"
                  } ${revealed ? "pointer-events-none cursor-default" : ""} ${
                    revealed && chosenIndex !== undefined
                      ? chosenIndex === p.index
                        ? "ring-2 ring-green-500 border-green-500"
                        : "opacity-60"
                      : ""
                  }`}
                >
                  <div
                    className="text-[3.25rem] mb-3"
                    role="img"
                    aria-label="Money Bag"
                  >
                    💰
                  </div>
                  {/* amount hidden per backend spec; reveal after raid if needed */}
                  <div className="text-center">
                    <p className="font-semibold text-neutral-900 text-[0.625rem]">
                      {p.name}
                    </p>
                    <p className={`font-bold ${p.colorClass} text-[0.625rem]`}>
                      {p.colorLabel}
                    </p>
                    <p className="mt-1 font-bold text-[0.625rem] text-neutral-700 flex items-center justify-center gap-1">
                      {revealed ? (
                        <>
                          <span>
                            {amountsByIndex &&
                            amountsByIndex[p.index] !== undefined
                              ? `${formatAmount(amountsByIndex[p.index])}`
                              : "–"}
                          </span>
                          {amountsByIndex &&
                          amountsByIndex[p.index] !== undefined ? (
                            <Coins size={10} color="#FFD700" />
                          ) : null}
                        </>
                      ) : (
                        "????"
                      )}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center text-neutral-800 mb-6">
              ไม่พบบุคคลที่มีสิทธิ์ให้ Raid ในขณะนี้
            </div>
          )}

          {/* Footer actions */}
          <div className="flex flex-col items-center gap-4">
            <p className="font-bold text-gray-500 text-[0.625rem]">
              กรุณาเลือกภายใน{" "}
              <span className="text-red-600 text-[0.625rem]">
                {secondsLeft}
              </span>{" "}
              วินาที
            </p>
            <div className="w-full max-w-xl">
              {!revealed ? (
                <button
                  onClick={handleConfirm}
                  disabled={
                    selectedIndex === null ||
                    submitting ||
                    enriched.length === 0
                  }
                  className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 text-white text-[0.875rem] ${
                    selectedIndex === null ||
                    submitting ||
                    enriched.length === 0
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:opacity-90"
                  }`}
                  style={{ backgroundColor: "rgb(104, 20, 28)" }}
                >
                  ขโมย!
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 text-white text-[0.875rem] hover:opacity-90"
                  style={{ backgroundColor: "rgb(104, 20, 28)" }}
                >
                  ปิด
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaidModal;
