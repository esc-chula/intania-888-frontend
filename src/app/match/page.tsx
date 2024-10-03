"use client";
import { Header } from "@/components/Header";
import { MatchMainFilter } from "@/components/MatchMainFilter";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { Selector } from "@/components/Selector";
export default function Home() {
  const [mainFilter, setMainFilter] = useState("upcomming");
  const [filter, setFilter] = useState("");
  const handdleChangeMainFilter = (text: string) => {
    setMainFilter(text);
    setFilter("");
  };

  return (
    <div className="flex flex-col items-center justify-start space-y-4 h-screen w-screen text-white">
      <div className="relative m-0 p-0 top-0 flex flex-col w-full">
        <Header />
        <Navbar pagenow="match" />
      </div>

      <div className="w-[95%] sm:w-[700px] items-center flex flex-col space-y-4">
        <p className="text-center max-w-[70vw] sm:hidden text-sm">
          ดูและทายผลการแข่งกีฬา intania game ฟรี! เว็บเดียวในวิศวะจุฬา
          แชร์กันเยอะๆ
        </p>
        <MatchMainFilter
          mainFilter={mainFilter}
          handdleChangeMainFilter={handdleChangeMainFilter}
        />
        <Selector
          mainFilter={mainFilter}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </div>
  );
}
