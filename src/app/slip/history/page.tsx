"use client";
import {useEffect, useState} from "react";
import { getMySlipHistoryDto } from "@/api/slip/slip.dto";
import { EmptyState } from "@/components/EmptyState";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { getMySlipHistory } from "@/api/slip/slip";
import SlipGroupResult from "@/components/slip/SlipGroupResult";

export default function Home() {
  const [history, setHistory] = useState<getMySlipHistoryDto[]>([]);

  useEffect(() => {
    const getHistory = async () => {
      const response = await getMySlipHistory();
      if (response?.success) {
        setHistory(response.data);
      }
    }

    getHistory();
  }, [history]);

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
        {history ? (
          history?.map((bill, index) => (
            <div key={index}><SlipGroupResult
              slipId={bill.id}
              netProfit={bill.total}
              slipResult={bill.lines}
            /></div>
          ))
        ) : (
          <EmptyState
            texts={[
              "หากต้องการทายผล ทำตามขั้นตอนดังนี้",
              "แมตช์ > เลือกแมตช์ที่ต้องการทาย > เพิ่งลงสลิป",
            ]}
          />
        )}
      </div>
    </div>
  );
}
