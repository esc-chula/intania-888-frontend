"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trophy, ReceiptText, Joystick, Coins } from "lucide-react";
import { useCoinStore } from "@/store/coin";
import { formatMoneyString } from "@/utils/money";
import useAuth from "@/hooks/useAuth";

export const Navbar = (props: { pagenow: string; allowAnonymous?: boolean }) => {
  const router = useRouter();
  const coinPoint = useCoinStore((state) => state.coinPoint);
  const { profile, status } = useAuth();

  useEffect(() => {
    if (status === "authenticated" && profile) {
      if (!profile.nick_name || !profile.group_id) {
        router.replace("/register/profile");
      }
      return;
    }

    if (status === "unauthenticated" && !props.allowAnonymous) {
      router.replace("/register");
    }
  }, [profile, props.allowAnonymous, router, status]);

  return (
    <div className="m-0 flex h-[55px] w-full cursor-pointer select-none flex-row items-center overflow-hidden bg-neutral-900 text-white max-sm:text-[0.8rem]">
      <Link href="/" className="group relative h-full w-1/4 items-center justify-center">
        <div className="flex h-full flex-row items-center justify-center space-x-2">
          <Trophy />
          <p>แมตช์</p>
        </div>
        {props.pagenow === "match" ? (
          <div className="absolute bottom-0 h-1 w-full bg-base-gold" />
        ) : (
          <div className="absolute bottom-0 h-0 w-full transition-all group-hover:h-1 group-hover:bg-white" />
        )}
      </Link>
      <Link href="/slip" className="group relative h-full w-1/4 items-center justify-center">
        <div className="flex h-full flex-row items-center justify-center space-x-2">
          <ReceiptText />
          <p>สลิป</p>
        </div>
        {props.pagenow === "slip" ? (
          <div className="absolute bottom-0 h-1 w-full bg-base-gold" />
        ) : (
          <div className="absolute bottom-0 h-0 w-full transition-all group-hover:h-1 group-hover:bg-white" />
        )}
      </Link>
      <Link href="/event" className="group relative h-full w-1/4 items-center justify-center">
        <div className="flex h-full flex-row items-center justify-center space-x-2">
          <Joystick />
          <p>อีเวนต์</p>
        </div>
        {props.pagenow === "event" ? (
          <div className="absolute bottom-0 h-1 w-full bg-base-gold" />
        ) : (
          <div className="absolute bottom-0 h-0 w-full transition-all group-hover:h-1 group-hover:bg-white" />
        )}
      </Link>
      <Link href="/coins" className="group relative h-full w-1/4 items-center justify-center">
        <div className="flex h-full flex-row items-center justify-center space-x-2">
          <p>{formatMoneyString(coinPoint)}</p>
          <Coins color="yellow" />
        </div>
        {props.pagenow === "coins" ? (
          <div className="absolute bottom-0 h-1 w-full bg-base-gold" />
        ) : (
          <div className="absolute bottom-0 h-0 w-full transition-all group-hover:h-1 group-hover:bg-white" />
        )}
      </Link>
    </div>
  );
};
