import { Header } from "@/components/Header";
import { LeaderBoardTable } from "@/components/LeaderBoardTable";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start space-y-4 h-screen w-screen text-white overflow-y-scroll pb-12">
      <div className="relative m-0 p-0 top-0 flex flex-col w-full">
        <Header />
        <Navbar pagenow="coins" />
      </div>
      <p className="text-sm max-w-[70%] text-center sm:hidden">
        ดูและทายผลการแข่งกีฬา intania game ฟรี! เว็บเดียวในวิศวะจุฬา
        แชร์กันเยอะๆ
      </p>
      <h1 className="text-2xl font-semibold my-2">ลิสต์รายชื่อมหาเศรษฐี</h1>
      <LeaderBoardTable />
    </div>
  );
}
