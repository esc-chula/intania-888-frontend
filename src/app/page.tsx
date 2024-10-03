import Playground from "@/components/Playground";
import { EmptyState } from "@/components/EmptyState";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-screen">
      <EmptyState
        texts={[
          "หากต้องการทายผล ทำตามขั้นตอนดังนี้",
          "แมตช์ > เลือกแมตช์ที่ต้องการทาย > เพิ่งลงสลิป",
        ]}
      />
      <Playground />
    </div>
  );
}
