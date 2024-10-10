"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trophy, ReceiptText, Joystick, Coins } from "lucide-react";
import { useCoinStore } from "@/store/coin";
import { apiClient } from "@/api/axios";

export const Navbar = (props: { pagenow: string }) => {
  const router = useRouter();
  const coinPoint = useCoinStore((state) => state.coinPoint);
  const refreshCoin = useCoinStore((state) => state.refreshCoin); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myId = (await apiClient.get("/auth/me")).data;
        await refreshCoin(myId.profile.id); 
      } catch (error) {
        console.error(error);
        router.push("/register");
      }
    };

    fetchData();
  }, [refreshCoin, router]);

  return (
    <div className="w-full h-[55px] bg-neutral-900 flex flex-row items-center m-0 text-white select-none cursor-pointer overflow-hidden max-sm:text-[0.8rem]">
      <a
        href="/match"
        className="w-1/4 h-full items-center justify-center group relative"
      >
        <div className="flex flex-row space-x-2 h-full items-center justify-center">
          <Trophy />
          <p>แมตช์</p>
        </div>
        {props.pagenow == "match" ? (
          <div className="h-1 w-full bg-base-gold absolute bottom-0"></div>
        ) : (
          <div className="group-hover:h-1  w-full h-0 group-hover:bg-white transition-all absolute bottom-0"></div>
        )}
      </a>
      <a
        href="/slip"
        className="w-1/4 h-full items-center justify-center group relative"
      >
        <div className="flex flex-row space-x-2 h-full items-center justify-center">
          <ReceiptText />
          <p>สลิป</p>
        </div>
        {props.pagenow == "slip" ? (
          <div className="h-1 w-full bg-base-gold absolute bottom-0"></div>
        ) : (
          <div className="group-hover:h-1  w-full h-0 group-hover:bg-white transition-all absolute bottom-0"></div>
        )}
      </a>
      <a
        href="/event"
        className="w-1/4 h-full items-center justify-center group relative"
      >
        <div className="flex flex-row space-x-2 h-full items-center justify-center">
          <Joystick />
          <p>อีเวนต์</p>
        </div>
        {props.pagenow == "event" ? (
          <div className="h-1 w-full bg-base-gold absolute bottom-0"></div>
        ) : (
          <div className="group-hover:h-1  w-full h-0 group-hover:bg-white transition-all absolute bottom-0"></div>
        )}
      </a>

      <a
        href="/coins"
        className="w-1/4 h-full items-center justify-center group relative"
      >
        <div className="flex flex-row space-x-2 h-full items-center justify-center">
          <p>{coinPoint}</p> {/* Display the global coin point */}
          <Coins color="yellow" />
        </div>
        {props.pagenow == "coins" ? (
          <div className="h-1 w-full bg-base-gold absolute bottom-0"></div>
        ) : (
          <div className="group-hover:h-1 w-full h-0 group-hover:bg-white transition-all absolute bottom-0"></div>
        )}
      </a>
    </div>
  );
};
