"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiClient } from "@/api/axios";

const UpdateScore = () => {
  const [teamAScore, setTeamAScore] = useState<number>(0);
  const [teamBScore, setTeamBScore] = useState<number>(0);
  const [teamAName, setTeamAName] = useState<string>("");
  const [teamBName, setTeamBName] = useState<string>("");
  const { matchId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await apiClient.get(`/matches/${matchId}`);
        setTeamAScore(res.data.team_a_score);
        setTeamBScore(res.data.team_b_score);
        setTeamAName(res.data.team_a);
        setTeamBName(res.data.team_b);
      } catch (error) {
        console.error("Error fetching match:", error);
      }
    };

    fetchMatch();
  }, [matchId]);

  const handleUpdateScore = async () => {
    try {
      await apiClient.patch(`/matches/${matchId}/score`, {
        teamAScore,
        teamBScore,
      });
      alert("Score updated successfully!");
      router.push("/admin");
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-bold mb-4">Update Match Score</h1>
      <div className="space-y-2">
        <div>
          <label>{teamAName} Score</label>
          <input
            type="number"
            value={teamAScore}
            onChange={(e) => setTeamAScore(Number(e.target.value))}
            className="border p-2 text-black"
          />
        </div>
        <div>
          <label>{teamBName} Score</label>
          <input
            type="number"
            value={teamBScore}
            onChange={(e) => setTeamBScore(Number(e.target.value))}
            className="border p-2 text-black"
          />
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white"
          onClick={handleUpdateScore}
        >
          Update Score
        </button>
      </div>
    </div>
  );
};

export default UpdateScore;
