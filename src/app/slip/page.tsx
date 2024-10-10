"use client";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Intania888Logo } from "../../../public/logos/Intania888-logo";
import SlipElement from "@/components/slip/SlipElement";
import Link from "next/link";
import { useSlipStore } from "@/store/slip";
import { createMySlip } from "@/api/slip/slip";
import { Coins } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useCoinStore } from "@/store/coin";

export default function Home() {
  const slipItems = useSlipStore((state) => state.slipItems);
  const totalRate = useSlipStore((state) => state.totalRate);
  const updateSlipRates = useSlipStore((state) => state.updateSlipRates);
  const [betAmount, setBetAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const refreshCoin = useCoinStore((state) => state.refreshCoin);
  useEffect(() => {
    updateSlipRates();
  }, [updateSlipRates]);

  const handleConfirmBet = async () => {
    const betAmountNum = parseFloat(betAmount);

    if (slipItems.length === 0 || isNaN(betAmountNum) || betAmountNum <= 0) {
      toast.error("กรุณาเลือกทีมและจำนวนเหรียญก่อนยืนยัน");
      return;
    }

    setIsLoading(true);

    const slipData = {
      total: betAmountNum,
      lines: slipItems.map((item) => ({
        match_id: item.match_id,
        rate: item.rate,
        betting_on: item.betting_on,
      })),
    };

    try {
      const response = await createMySlip(slipData);
      if (response?.success) {
        toast.success("การเดิมพันสำเร็จ!");
        await refreshCoin();
        setBetAmount(""); // Reset the input to empty after successful submission
      } else {
        toast.error("เกิดข้อผิดพลาดในการทำการเดิมพัน");
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการทำการเดิมพันหรือเงินไม่พอ");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
            className="max-sm:text-sm text-lg text-white font-semibold rounded-lg h-10 w-40 sm:h-14 sm:w-48 bg-neutral-700 flex items-center justify-center"
          >
            สลิปปัจจุบัน
          </Link>
          <Link
            href="/slip/history"
            className="max-sm:text-sm text-lg text-white font-semibold rounded-lg h-10 w-40 sm:h-14 sm:w-48 bg-neutral-800 flex items-center justify-center"
          >
            ประวัติ
          </Link>
        </div>
        <div className="flex flex-col">
          <p className="text-white font-semibold max-sm:text-xs text-lg">
            โปรดอ่านเงื่อนไขก่อนทายผล :
          </p>
          <ul className="text-white max-sm:text-xs text-lg space-y-1">
            <li>
              1. เรทมีการเปลี่ยนแปลงตลอดเวลา โดยจะยึดตามตอนที่ผู้ใช้ทำการทาย
            </li>
            <li>
              2. หากเลือกทายผลเพียง 1 คู่ จะเป็นการทายผล{" "}
              <span className="font-bold">แบบเดี่ยว</span> โดยอัตโนมัติ
            </li>
            <li>
              3. หากเลือกทายผลมากกว่า 1 คู่ จะเป็นการทายผล{" "}
              <span className="font-bold">แบบชุด</span> โดยอัตโนมัติ
            </li>
            <li className="pl-4">
              3.1 การทายผลแบบชุดจะได้เรทที่สูงกว่าการทายแบบเดี่ยว
            </li>
            <li className="pl-4">
              3.2 การทายผลแบบชุดหากทายผิดแม้แต่ 1 คู่ จะถือว่าทายผิดทั้งหมด
            </li>
          </ul>
        </div>
      </div>
      <main className="flex flex-col items-center justify-center text-white p-4 w-96 rounded-lg">
        <section className="w-full flex items-center justify-center bg-gradient-to-t from-[#4E0F15] to-[#68141C] p-4 rounded-t-lg">
          <div className="w-28">
            <Intania888Logo />
          </div>
        </section>
        <section className="w-full flex items-center justify-center flex-col">
          {slipItems.map((element, idx) => (
            <SlipElement
              key={idx}
              matchId={element.match_id}
              date={element.date}
              sportType={element.sport_type}
              teamAColor={element.team_a_color}
              teamBColor={element.team_b_color}
              currentRate={element.rate}
            />
          ))}
        </section>
        <section className="flex items-center flex-col w-full">
          <section className="w-full bg-neutral-300 font-semibold text-sm h-10 flex items-center justify-between pl-3 pr-3">
            <p className="text-black">
              รูปแบบการทาย:{" "}
              <span className="text-indigo-700">
                {slipItems.length > 1 ? "แบบชุด" : "แบบเดี่ยว"}
              </span>
            </p>
            <p className="text-black">
              {slipItems.length > 1 ? `เรทปัจจุบันรวม : ${totalRate.toFixed(2)}` : ""}
            </p>
          </section>
          <section className="w-full bg-neutral-200 font-semibold text-sm h-10 flex items-center justify-between px-3">
            <p className="text-black">จำนวนเหรียญที่ใช้เดินพัน</p>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                className="text-black text-right h-7 p-2 border border-gray-300 rounded-lg w-24"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)} // Handle input as string
              />
              <Coins color="yellow" />
            </div>
          </section>
          <section className="w-full bg-neutral-200 font-semibold text-sm h-10 flex items-center justify-between px-3">
            <p className="text-black">เหรียญที่พึ่งพาได้</p>
            <div className="flex items-center space-x-1">
              <p className="text-black font-semibold">500</p>
              <Coins color="yellow" />
            </div>
          </section>

          <section className="w-full h-10 flex items-center justify-center p-4 rounded-b-lg bg-green-800">
            <button
              className="text-white font-semibold"
              onClick={handleConfirmBet}
              disabled={isLoading}
            >
              {isLoading ? "กำลังยืนยัน..." : "ยืนยันการทาย"}
            </button>
          </section>
        </section>
      </main>
    </div>
  );
}
