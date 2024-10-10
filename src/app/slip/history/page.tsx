"use client";
import { useEffect, useState } from "react";
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
    };

    getHistory();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start space-y-4 h-screen w-screen">
      <div className="relative m-0 p-0 top-0 flex flex-col w-full">
        <Header />
        <Navbar pagenow="slip" />
      </div>
      <div className="flex items-center justify-center flex-col space-y-4">
        <p className="text-sm max-w-[70%] text-center sm:hidden text-white">
          ดูและทายผลการแข่งกีฬา intania game ฟรี! เว็บเดียวในวิศวะจุฬา
          แชร์กันเยอะๆ
        </p>
        <div className="flex items-center justify-center space-x-2.5">
          <Link
            href="/slip"
            className="max-sm:text-sm text-lg text-white font-semibold rounded-lg h-10 w-40 sm:h-14 sm:w-48 bg-neutral-800 flex items-center justify-center"
          >
            สลิปปัจจุบัน
          </Link>
          <Link
            href="/slip/history"
            className="max-sm:text-sm text-lg text-white font-semibold rounded-lg h-10 w-40 sm:h-14 sm:w-48 bg-neutral-700 flex items-center justify-center"
          >
            ประวัติ
          </Link>
        </div>
        {history ? (
          history?.map((bill, index) => (
            <div key={index}>
              <SlipGroupResult
                slipId={bill.id}
                netProfit={bill.total}
                slipResult={bill.lines}
              />
            </div>
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
