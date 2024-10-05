import { EmptyState } from "@/components/EmptyState";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { SlipResultProps } from "@/components/slip/SlipResult";
import SlipGroupResult from "@/components/slip/SlipGroupResult";
import Link from "next/link";

export default function Home() {
  const mockSlipResult: SlipResultProps[] = [
    {
      date: '2024-10-01',
      sportType: 'Football',
      teamAColor: 'pink', 
      teamBColor: 'blue', 
      currentRate: 1.75,
      predictedTeam: 'Team A',
    },
    {
      date: '2024-10-02',
      sportType: 'Basketball',
      teamAColor: 'pink',
      teamBColor: 'green',
      currentRate: 2.25,
      predictedTeam: 'Team B',
    },
    {
      date: '2024-10-03',
      sportType: 'Tennis',
      teamAColor: 'yellow',
      teamBColor: 'blue',
      currentRate: 1.95,
      predictedTeam: 'Team A',
    },
    {
      date: '2024-10-04',
      sportType: 'Baseball',
      teamAColor: 'pink',
      teamBColor: 'green',
      currentRate: 1.85,
      predictedTeam: 'Team B',
    }
  ];

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
        {mockSlipResult ? (
          <SlipGroupResult slipId="123456" netProfit={100} slipResult={mockSlipResult} />
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
