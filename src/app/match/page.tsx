import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start space-y-4 h-screen w-screen text-white">
      <div className="relative m-0 p-0 top-0 flex flex-col w-full">
        <Header />
        <Navbar pagenow="match" />
      </div>
      <p>
        ดูและทายผลการแข่งกีฬา intania game ฟรี! เว็บเดียวในวิศวะจุฬา
        แชร์กันเยอะๆ
      </p>
    </div>
  );
}
