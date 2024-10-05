import { EmptyState } from "@/components/EmptyState";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start space-y-4 h-screen w-screen">
      <div className="relative m-0 p-0 top-0 flex flex-col w-full">
        <Header />
        <Navbar pagenow="slip" />
      </div>
      <EmptyState
        texts={[
          "หากต้องการทายผล ทำตามขั้นตอนดังนี้",
          "แมตช์ > เลือกแมตช์ที่ต้องการทาย > เพิ่งลงสลิป",
        ]}
      />
    </div>
  );
}