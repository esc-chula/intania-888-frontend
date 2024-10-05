"use client";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Selector } from "@/components/Selector";
import { MatchMainFilter } from "@/components/match/MatchMainFilter";
import { DisplayMatchs } from "@/components/match/DisplayMatchs";
import { getMatch } from "@/api/match/getmatch";
import { allMatchInterface } from "@/components/match/MatchInterface";
import {
  selectorTextMap,
  choicesList,
} from "@/components/match/MatchMapAndList";

export default function Home() {
  // declare useState
  const [mainFilter, setMainFilter] = useState("upcomming");
  const [filter, setFilter] = useState("");
  const [allMatch, setAllMatch] = useState<allMatchInterface[] | undefined>(
    undefined
  );
  const [showMatch, setShowMatch] = useState<allMatchInterface[] | undefined>(
    undefined
  );

  // handle filter selection
  const handdleChangeMainFilter = (text: string) => {
    setMainFilter(text);
    setFilter("");
  };

  // get date when loaded page
  const fetchMatchData = async () => {
    const data = (await getMatch())?.data;
    setAllMatch(data);
  };
  useEffect(() => {
    fetchMatchData();
  }, []);

  // filter data
  useEffect(() => {
    let show = allMatch;

    if (mainFilter === "overall") {
      setShowMatch(allMatch);
      return;
    }

    if (mainFilter === "upcomming") {
      show = allMatch?.filter((item) => item.date_D >= new Date(Date.now()));
    } else if (mainFilter === "result") {
      show = allMatch?.filter((item) => item.date_D < new Date(Date.now()));
    }

    if (filter != "รวมกีฬาทุกประเภท" && filter != "") {
      const sport = selectorTextMap[filter];

      show = show
        ?.map((match) => {
          const filterM = match.matches.filter((m) => m.sport === sport);
          return { ...match, matches: filterM };
        })
        .filter((match) => match.matches.length > 0);
    }

    setShowMatch(show);
  }, [mainFilter, filter, allMatch]);

  // JSX element
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
        {showMatch !== undefined ? (
          showMatch.map((match, index) => (
            <DisplayMatchs
              key={index}
              matches={match.matches}
              date={match.date}
              date_D={match.date_D}
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
