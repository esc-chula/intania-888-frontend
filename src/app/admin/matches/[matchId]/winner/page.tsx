"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiClient } from "@/api/axios";

const UpdateWinner = () => {
  const [winner, setWinner] = useState<string>("");
  const [teamAName, setTeamAName] = useState<string>("");
  const [teamBName, setTeamBName] = useState<string>("");

  const { matchId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await apiClient.get(`/matches/${matchId}`);
        setTeamAName(res.data.team_a);
        setTeamBName(res.data.team_b);
      } catch (error) {
        console.error("Error fetching match:", error);
      }
    };

    fetchMatch();
  }, [matchId]);

  const handleUpdateWinner = async () => {
    try {
      if (winner === "draw") {
        await apiClient.patch(`/matches/${matchId}/draw`);
      } else {
        await apiClient.patch(`/matches/${matchId}/winner/${winner}`);
      }
      alert("Match result updated successfully!");
      router.push("/admin");
    } catch (error) {
      console.error("Error updating match result:", error);
    }
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-bold mb-4">Update Match Result</h1>
      <div className="space-y-2">
        <label>Choose the Winner</label>
        <select
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
          className="border p-2 text-black"
        >
          <option value="">Select Result</option>
          <option value={teamAName}>{teamAName}</option>
          <option value={teamBName}>{teamBName}</option>
          <option value="draw">Draw</option> 
        </select>
        <button
          className="px-4 py-2 bg-green-500 text-white"
          onClick={handleUpdateWinner}
        >
          Update Result
        </button>
      </div>
    </div>
  );
};

export default UpdateWinner;
