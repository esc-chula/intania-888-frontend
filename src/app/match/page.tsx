"use client";
import { Header } from "@/components/Header";
import { MatchMainFilter } from "@/components/match/MatchMainFilter";
import { Navbar } from "@/components/Navbar";
import { useEffect, useState } from "react";
import { Selector } from "@/components/Selector";
import { DisplayMatchs } from "@/components/match/DisplayMatchs";
import { getMatch } from "@/api/match/getmatch";
import { allMatchInterface } from "@/components/match/MatchUtils";
export default function Home() {
  const [mainFilter, setMainFilter] = useState("upcomming");
  const [filter, setFilter] = useState("");
  const [allMatch, setAllMatch] = useState<allMatchInterface[] | undefined>(
    undefined
  );
  const [showMatch, setShowMatch] = useState<allMatchInterface[] | undefined>(
    undefined
  );
  const handdleChangeMainFilter = (text: string) => {
    setMainFilter(text);
    setFilter("");
  };
  const fetchMatchData = async () => {
    const data = await getMatch();
    return data;
  };
  useEffect(() => {
    fetchMatchData();
    // const data = fetchMatchData();
    setAllMatch([
      {
        date: "วันจันทร์ที่ 28 ตุลาคม 2567",
        matchs: allmatchs,
      },
    ]);
  }, []);
  useEffect(() => {
    const show = allMatch;
    setShowMatch(show);
  }, [mainFilter, filter, allMatch]);

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
        {showMatch !== undefined ? (
          showMatch.map((match, index) => (
            <DisplayMatchs
              key={index}
              matchs={match.matchs}
              date={match.date}
            />
          ))
        ) : (
          <div></div>
        )}
        <span className="w-2 h-4" />
      </div>
    </div>
  );
}

const allmatchs = [
  {
    location: "ลานพระบรมรูปสองรัชกาล",
    sport: "ฟุตบอลชาย",
    league: "all",
    round: [
      {
        time: "15:00",
        colorA: "pink",
        colorB: "green",
        status: "bet",
      },
      {
        time: "17:00",
        colorA: "blue",
        colorB: "purple",
        status: "done",
      },
    ],
  },
  {
    location: "สนามกีฬาในร่ม 1",
    sport: "บาสเก็ตบอลหญิง",
    league: "freshman",
    round: [
      {
        time: "15:00",
        colorA: "yellow",
        colorB: "orange",
        status: "playing",
      },
    ],
  },
  {
    location: "สนามกีฬาในร่ม 1",
    sport: "บาสเก็ตบอลหญิง",
    league: "senior",
    round: [
      {
        time: "15:00",
        colorA: "pink",
        colorB: "TBA",
        status: "none",
      },
    ],
  },
];
