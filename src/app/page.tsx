"use client";

import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Selector } from "@/components/Selector";
import { MatchMainFilter } from "@/components/match/MatchMainFilter";
import { DisplayMatchs } from "@/components/match/DisplayMatchs";
import { getMatch, getMatchSub } from "@/api/match/getmatch";
import { allMatchInterface } from "@/components/match/MatchInterface";
import {
  selectorTextMap,
  choicesList,
} from "@/components/match/MatchMapAndList";
import { EmptyState } from "@/components/EmptyState";
import { LeaderBoardTableDisplay } from "@/components/ColorLeaderBoardDisplay";
import { leaderboardDataInterface } from "@/components/ColorLeaderBoardUtils";
import { Footer } from "@/components/Footer";
import { useSportCatalog } from "@/components/SportCatalogProvider";

export default function Home() {
  const [mainFilter, setMainFilter] = useState("upcoming");
  const [filter, setFilter] = useState("");
  const [showMatch, setShowMatch] = useState<allMatchInterface[] | undefined>(
    undefined
  );
  const [teamA, setTeamA] = useState<leaderboardDataInterface[] | undefined>(
    undefined
  );
  const [teamB, setTeamB] = useState<leaderboardDataInterface[] | undefined>(
    undefined
  );
  const { sportTypes } = useSportCatalog();

  const sportChoices = useMemo(
    () =>
      sportTypes.length > 0
        ? ["รวมกีฬาทุกประเภท", ...sportTypes.map((sport) => sport.title)]
        : choicesList,
    [sportTypes],
  );
  const sportIdByTitle = useMemo(
    () => ({
      ...selectorTextMap,
      ...Object.fromEntries(
        sportTypes.map((sport) => [sport.title, sport.id]),
      ),
    }),
    [sportTypes],
  );

  // Handle filter selection
  const handdleChangeMainFilter = (text: string) => {
    setMainFilter(text);
    setFilter("");
  };

  useEffect(() => {
    if (mainFilter === "overall") return;

    let cancelled = false;
    const fetchMatchData = async () => {
      setShowMatch(undefined);
      const typeId =
        filter === "" || filter === "รวมกีฬาทุกประเภท"
          ? undefined
          : sportIdByTitle[filter];
      const result = await getMatch({
        schedule: mainFilter === "upcoming" ? "schedule" : "result",
        typeId,
      });
      if (!cancelled) setShowMatch(result?.data ?? []);
    };

    void fetchMatchData();
    return () => {
      cancelled = true;
    };
  }, [filter, mainFilter, sportIdByTitle]);

  // Fetch team data for overall view
  useEffect(() => {
    if (mainFilter !== "overall") return;

    const fetchMatchSub = async ({ type_id }: { type_id: string }) => {
      const resA = await getMatchSub({ type_id, group_id: "A" });
      const resB = await getMatchSub({ type_id, group_id: "B" });
      setTeamA(resA?.data);
      setTeamB(resB?.data);
    };

    const type_id_temp = filter === "" ? "ALL" : sportIdByTitle[filter];
    fetchMatchSub({ type_id: type_id_temp });
  }, [mainFilter, filter, sportIdByTitle]);

  return (
    <>
      <div className="flex flex-col items-center justify-start space-y-4 min-h-screen w-screen pb-32 text-white">
        <div className="relative m-0 p-0 top-0 flex flex-col w-full">
          <Header />
          <Navbar pagenow="match" allowAnonymous />
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
            choicesList={sportChoices}
            mainFilter={mainFilter}
            filter={filter}
            setFilter={setFilter}
          />

          {mainFilter === "overall" ? (
            <LeaderBoardTableDisplay
              sport={
                filter === "รวมกีฬาทุกประเภท" || filter === ""
                  ? ""
                  : sportIdByTitle[filter]
              }
              teamA={teamA}
              teamB={teamB}
            />
          ) : showMatch?.length ? (
            showMatch.map((match, index) => (
              <DisplayMatchs
                key={index}
                matches={match.matches}
                date={match.date}
                date_D={match.date_D}
              />
            ))
          ) : mainFilter === "upcoming" ? (
            <EmptyState texts={["ไม่มีการแข่งขันที่กำลังแข่งในขณะนี้"]} />
          ) : (
            <EmptyState texts={["ยังไม่มีการแข่งขันที่เสร็จสิ้นในขณะนี้"]} />
          )}

          <span className="w-2 h-4" />
        </div>
      </div>
      <Footer />
    </>
  );
}
