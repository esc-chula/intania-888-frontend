"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/api/axios";
import { sportTextMap } from "@/components/match/MatchMapAndList";

interface Match {
  id: string;
  team_a: string;
  team_b: string;
  team_a_score: number | null;
  team_b_score: number | null;
  team_a_rate: number;
  team_b_rate: number;
  winner: string;
  type: string;
  is_draw: boolean;
  start_time: string;
  end_time: string;
}

interface SportType {
  sportType: string;
  matches: Match[];
}

interface MatchDay {
  date: string;
  types: SportType[];
}

const AdminBackoffice = () => {
  const [matchesData, setMatchesData] = useState<MatchDay[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await apiClient.get("/matches");
        console.log(res);
        setMatchesData(res.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  const goToUpdateScore = (matchId: string) => {
    router.push(`/admin/matches/${matchId}/score`);
  };

  const goToUpdateWinner = (matchId: string) => {
    router.push(`/admin/matches/${matchId}/winner`);
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-bold mb-4">Admin Backoffice - Matches</h1>
      {matchesData.map((day: MatchDay, index: number) => (
        <div key={index} className="mb-8">
          <h2 className="text-lg font-bold mb-2">
            Date: {new Date(day.date).toLocaleDateString()}
          </h2>
          {day.types.map((sportType: SportType, typeIndex: number) => (
            <div key={typeIndex} className="mb-4">
              <h3 className="text-md font-semibold">{sportTextMap[sportType.sportType]}</h3>
              {sportType.matches.map((match: Match) => (
                <div key={match.id} className="p-4 border rounded mb-4">
                  <p>
                    team_a: {match.team_a} vs team_b: {match.team_b}
                  </p>
                  <p>
                    Score: {match.team_a_score ?? 0} - {match.team_b_score ?? 0}
                  </p>
                  <p>Winner: {match.winner || "N/A"}</p>
                  <div className="mt-2 space-x-2">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white"
                      onClick={() => goToUpdateScore(match.id)}
                    >
                      Update Score
                    </button>
                    <button
                      className="px-4 py-2 bg-green-500 text-white"
                      onClick={() => goToUpdateWinner(match.id)}
                    >
                      Update Winner
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminBackoffice;
