import Playground from "@/components/Playground";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-screen">
      <Header />
      <Playground />
    </div>
  );
}
