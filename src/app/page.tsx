"use client";

import { Suspense, useEffect, useState } from "react";
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
import { apiClient } from "@/api/axios";
import { leaderboardDataInterface } from "@/components/ColorLeaderBoardUtils";
import OAuthCallbackHandler from "@/components/auth/OAuthCallBackHandler";
import { getAccessToken } from "@/utils/token";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [mainFilter, setMainFilter] = useState("upcomming");
  const [filter, setFilter] = useState("");
  const [allMatch, setAllMatch] = useState<allMatchInterface[] | undefined>(
    undefined
  );
  const [showMatch, setShowMatch] = useState<allMatchInterface[] | undefined>(
    undefined
  );
  const [dateNow, setDateNow] = useState<Date>(new Date(Date.now()));
  const [teamA, setTeamA] = useState<leaderboardDataInterface[] | undefined>(
    undefined
  );
  const [teamB, setTeamB] = useState<leaderboardDataInterface[] | undefined>(
    undefined
  );

  // Handle filter selection
  const handdleChangeMainFilter = (text: string) => {
    setMainFilter(text);
    setFilter("");
  };

  // Get date when page loads
  useEffect(() => {
    const fetchMatchData = async () => {
      const token = getAccessToken();
      if (!token) {
        return;
      }

      try {
        const result = await getMatch();
        const data = result?.data;
        if (!data) {
          return;
        }

        setAllMatch(data);
        // Keep dateNow in UTC for comparisons
        setDateNow(
          new Date(
            (await apiClient.get("/matches/current/time")).data.currentTime
          )
        );
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      }
    };

    fetchMatchData();
  }, []);

  // Filter data
  useEffect(() => {
    if (!allMatch) return;

    if (mainFilter === "overall") {
      setShowMatch(allMatch);
      return;
    }

    let show = allMatch;
    const sport = selectorTextMap[filter];

    if (mainFilter === "upcomming") {
      show = show
        ?.map((match) => {
          const filteredMatches = match.matches
            .map((m) => {
              const filteredRounds = m.round.filter((r) => {
                if (filter !== "รวมกีฬาทุกประเภท" && filter !== "") {
                  return r.time_end >= dateNow && m.sport === sport;
                } else {
                  return r.time_end >= dateNow;
                }
              });
              return { ...m, round: filteredRounds };
            })
            .filter((r) => r.round.length > 0);
          return { ...match, matches: filteredMatches };
        })
        .filter((match) => match.matches.length > 0);
    } else if (mainFilter === "result") {
      show = show
        ?.map((match) => {
          const filteredMatches = match.matches
            .map((m) => {
              const filteredRounds = m.round.filter((r) => {
                if (filter !== "รวมกีฬาทุกประเภท" && filter !== "") {
                  return r.time_end < dateNow && m.sport === sport;
                } else {
                  return r.time_end < dateNow;
                }
              });
              return { ...m, round: filteredRounds };
            })
            .filter((r) => r.round.length > 0);
          return { ...match, matches: filteredMatches };
        })
        .filter((match) => match.matches.length > 0);
    }

    setShowMatch(show);
  }, [mainFilter, filter, allMatch, dateNow]);

  // Fetch team data for overall view
  useEffect(() => {
    if (mainFilter !== "overall") return;

    const fetchMatchSub = async ({ type_id }: { type_id: string }) => {
      const resA = await getMatchSub({ type_id, group_id: "A" });
      const resB = await getMatchSub({ type_id, group_id: "B" });
      setTeamA(resA?.data);
      setTeamB(resB?.data);
    };

    const type_id_temp = filter === "" ? "ALL" : selectorTextMap[filter];
    fetchMatchSub({ type_id: type_id_temp });
  }, [mainFilter, filter]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OAuthCallbackHandler />
      <div className="flex flex-col items-center justify-start space-y-4 min-h-screen w-screen pb-32 text-white">
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

          {mainFilter === "overall" ? (
            <LeaderBoardTableDisplay
              sport={
                filter === "รวมกีฬาทุกประเภท" || filter === ""
                  ? ""
                  : selectorTextMap[filter]
              }
              dateNow={dateNow}
              teamA={teamA}
              teamB={teamB}
            />
          ) : mainFilter === "upcomming" ? (
            <EmptyState texts={["ไม่มีการแข่งขันที่กำลังแข่งในขณะนี้"]} />
          ) : (
            <EmptyState texts={["ยังไม่มีการแข่งขันที่เสร็จสิ้นในขณะนี้"]} />
          )}

          {showMatch?.length ? (
            showMatch.map((match, index) => (
              <DisplayMatchs
                key={index}
                matches={match.matches}
                date={match.date}
                date_D={match.date_D}
              />
            ))
          ) : null}

          <span className="w-2 h-4" />
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}
