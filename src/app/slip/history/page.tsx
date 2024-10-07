"use client";

import { useEffect, useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { SlipResultProps } from "@/components/slip/SlipResult";
import SlipGroupResult from "@/components/slip/SlipGroupResult";
import Link from "next/link";
import { getMySlipHistory } from "@/api/slip/slip";

export default function Home() {
  const [slipHistory, setHistory] = useState<Bill[] | undefined>(undefined);
  
  useEffect(() => {
    const fetchHistory = async () => {
      const response = await getMySlipHistory();
      
      if (!response) {
          return;
      }

      setHistory(response.data.lines);
    };
    fetchHistory();
  });

  return (
    <div className="flex flex-col items-center justify-start space-y-4 h-screen w-screen">
      <div className="relative m-0 p-0 top-0 flex flex-col w-full">
        <Header />
        <Navbar pagenow="slip" />
      </div>
      <div className="flex items-center justify-center flex-col space-y-4">
      <p className="text-white text-center font-semibold text-xs">
          ดูและทายผลการแข่งกีฬา intania game ฟรี! เว็บเดียวในวิศวะจุฬา แชร์กันเยอะๆ
        </p>
        <div className="flex items-center justify-center space-x-2.5">
          <Link href="/slip" className="text-sm text-white font-semibold rounded w-28 h-9 bg-neutral-800 flex items-center justify-center">
            สลิปปัจจุบัน
          </Link>
          <Link href="/slip/history" className="text-sm text-white font-semibold rounded w-28 h-9 bg-neutral-700 flex items-center justify-center">
            ประวัติ
          </Link>
        </div>
        {slipHistory ? (
          <SlipGroupResult slipId={slipId} netProfit={100} slipResult={[]} />
        ) : (
          <EmptyState
            texts={[
              "หากต้องการทายผล ทำตามขั้นตอนดังนี้",
              "แมตช์ > เลือกแมตช์ที่ต้องการทาย > เพิ่งลงสลิป",
            ]}
          />
        )
        }
      </div>
    </div>
  );
}
