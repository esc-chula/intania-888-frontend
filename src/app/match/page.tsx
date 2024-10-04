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
  const choicesList = [
    "รวมกีฬาทุกประเภท",
    "ฟุตบอลชาย ปี 1",
    "ฟุตบอลชาย ปี 2-4",
    "บาสเก็ตบอลชาย ปี 1",
    "บาสเก็ตบอลชาย ปี 2-4",
    "บาสเก็ตบอลหญิง รวมทุกชั้นปี",
    "วอลเลย์บอลชาย รวมทุกชั้นปี",
    "วอลเลย์บอลหญิง รวมทุกชั้นปี",
    "แชร์บอลหญิง ปี 1",
    "แชร์บอลหญิง ปี 2-4",
  ];

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
          choicesList={choicesList}
          mainFilter={mainFilter}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </div>
  );
}
