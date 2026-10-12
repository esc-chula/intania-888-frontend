"use client";
import { getDailyRewardStatus, loginDaily } from "@/api/event/slot";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { useEventStore } from "@/store/event";

const getBangkokDate = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

export const EventButton = ({
  Sstate,
  type,
  link,
}: {
  Sstate: number;
  type: string;
  link: string;
}) => {
  const { profile, status, refreshSession } = useAuth();
  const dailyClaimDate = useEventStore((eventState) =>
    profile ? eventState.dailyClaimDateByUser[profile.id] : undefined,
  );
  const setDailyClaimDate = useEventStore(
    (eventState) => eventState.setDailyClaimDate,
  );
  const [state, setState] = useState(Sstate);
  const [isCheckingDailyStatus, setIsCheckingDailyStatus] = useState(
    type === "daily",
  );
  const [isRedeemingDaily, setIsRedeemingDaily] = useState(false);

  useEffect(() => {
    if (type !== "daily") return;
    if (status !== "authenticated" || !profile) return;

    let cancelled = false;

    const loadDailyStatus = async () => {
      const today = getBangkokDate();

      if (dailyClaimDate === today) {
        setState(2);
        setIsCheckingDailyStatus(false);
        return;
      }

      const result = await getDailyRewardStatus();
      if (cancelled) return;

      if (result.success) {
        setState(result.claimed ? 2 : 1);
        setDailyClaimDate(profile.id, result.claimed ? today : null);
      }
      setIsCheckingDailyStatus(false);
    };

    void loadDailyStatus();

    return () => {
      cancelled = true;
    };
  }, [dailyClaimDate, profile, setDailyClaimDate, status, type]);

  const handleAddState = () => {
    const newV = state + 1 > 2 ? 2 : state + 1;
    setState(newV);
  };
  const handleDaily = async () => {
    if (isRedeemingDaily || state === 2) return;

    setIsRedeemingDaily(true);
    const res = await loginDaily();

    if (res.status === "claimed") {
      setState(2);
      if (profile) setDailyClaimDate(profile.id, getBangkokDate());
      await refreshSession();
      toast.success("รับเหรียญสำเร็จ");
      setIsRedeemingDaily(false);
      return;
    }

    if (res.status === "already-claimed") {
      setState(2);
      if (profile) setDailyClaimDate(profile.id, getBangkokDate());
      setIsRedeemingDaily(false);
      return;
    }

    toast.error("ไม่สามารถรับเหรียญได้");
    setIsRedeemingDaily(false);
  };

  if (isCheckingDailyStatus) {
    return (
      <div
        aria-label="กำลังตรวจสอบสถานะรางวัลประจำวัน"
        className="flex h-9 w-20 animate-pulse items-center justify-center rounded-lg bg-gray-200 text-sm text-gray-500 sm:h-12 sm:w-28 sm:text-lg"
      >
        กำลังโหลด
      </div>
    );
  }

  if (state === 0) {
    return (
      <a
        target="_blank"
        href={link}
        onClick={handleAddState}
        className="flex items-center justify-center cursor-pointer text-sm sm:text-lg w-20 h-9 sm:h-12 sm:w-28 bg-[#4E0F15] text-white rounded-lg"
      >
        ติดตาม
      </a>
    );
  } else if (state === 1) {
    if (type === "daily") {
      return (
        <button
          type="button"
          onClick={handleDaily}
          disabled={isRedeemingDaily}
          className="flex h-9 w-20 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-t from-base-gold to-white text-sm hover:from-[#bc9636] disabled:cursor-not-allowed disabled:opacity-60 sm:h-12 sm:w-28 sm:text-lg"
        >
          {isRedeemingDaily ? "กำลังรับ..." : "รับเหรียญ"}
        </button>
      );
    } else {
      return (
        <div
          onClick={async () => {
            handleAddState();
            toast.success("รับเหรียญสำเร็จ");
          }}
          className="flex items-center justify-center cursor-pointer text-sm sm:text-lg w-20 h-9 sm:h-12 sm:w-28 bg-gradient-to-t from-base-gold hover:from-[#bc9636] to-white rounded-lg"
        >
          รับเหรียญ
        </div>
      );
    }
  } else {
    return (
      <button
        type="button"
        disabled
        aria-label="รับเหรียญประจำวันแล้ว"
        className="flex h-9 w-20 cursor-not-allowed items-center justify-center rounded-lg bg-gray-300 text-sm text-gray-600 sm:h-12 sm:w-28 sm:text-lg"
      >
        รับแล้ว
      </button>
    );
  }
};
