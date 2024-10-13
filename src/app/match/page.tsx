"use client";
import { useEffect, useState } from "react";
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
  const [dateNow, setDateNow] = useState<Date>(new Date(Date.now()));
  const [teamA, setTeamA] = useState<leaderboardDataInterface[] | undefined>(
    undefined
  );
  const [teamB, setTeamB] = useState<leaderboardDataInterface[] | undefined>(
    undefined
  );

  // handle filter selection
  const handdleChangeMainFilter = (text: string) => {
    setMainFilter(text);
    setFilter("");
  };

  // get date when loaded page

  useEffect(() => {
    const fetchMatchData = async () => {
      const data = (await getMatch())?.data;
      setAllMatch(data);

      setDateNow(
        new Date(
          new Date((await apiClient.get("/matches/current/time")).data.currentTime).getTime() + (7 * 60 * 60 * 1000)
        )
      );
    };

    fetchMatchData();
  }, []);

  // filter data
  useEffect(() => {
    const fetchMatchSub = async ({
      type_id,
      group_id,
    }: {
      type_id: string;
      group_id: string;
    }) => {
      const res = await getMatchSub({ type_id, group_id });
      if (group_id == "A") {
        setTeamA(res?.data);
      } else {
        setTeamB(res?.data);
      }
      return res?.data;
    };

    if (mainFilter != "upcomming") {
      fetchMatchSub({
        type_id: selectorTextMap[filter],
        group_id: "A",
      });
      fetchMatchSub({
        type_id: selectorTextMap[filter],
        group_id: "B",
      });
    }
    
    let show = allMatch;

    if (mainFilter === "overall") {
      setShowMatch(allMatch);
      return;
    }

    const sport = selectorTextMap[filter];

    if (mainFilter === "upcomming") {
      show = show
        ?.map((match) => {
          const filterM = match.matches
            .map((m) => {
              const filterd_r = m.round.filter((r) => {
                if (filter != "รวมกีฬาทุกประเภท" && filter != "") {
                  return r.time_end >= dateNow && m.sport === sport;
                } else {
                  return r.time_end >= dateNow;
                }
              });
              return { ...m, round: filterd_r };
            })
            .filter((r) => r.round.length > 0);
          return { ...match, matches: filterM };
        })
        .filter((match) => match.matches.length > 0);
    } else if (mainFilter === "result") {
      show = show
        ?.map((match) => {
          const filterM = match.matches
            .map((m) => {
              const filterd_r = m.round.filter((r) => {
                if (filter != "รวมกีฬาทุกประเภท" && filter != "") {
                  return r.time_end < dateNow && m.sport === sport;
                } else {
                  return r.time_end < dateNow;
                }
              });
              return { ...m, round: filterd_r };
            })
            .filter((r) => r.round.length > 0);
          return { ...match, matches: filterM };
        })
        .filter((match) => match.matches.length > 0);
    }

    setShowMatch(show);
  }, [mainFilter, filter, allMatch, dateNow]);

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

        {mainFilter === "overall" ? (
          <LeaderBoardTableDisplay
            sport={
              filter == "รวมกีฬาทุกประเภท" || filter == ""
                ? ""
                : selectorTextMap[filter]
            }
            dateNow={dateNow}
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
  );
}
