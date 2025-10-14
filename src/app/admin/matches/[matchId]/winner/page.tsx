"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiClient } from "@/api/axios";
import { ArrowLeft, Trophy, Award } from "lucide-react";

export default function UpdateWinner() {
  const [winner, setWinner] = useState<string>("");
  const [teamAName, setTeamAName] = useState<string>("");
  const [teamBName, setTeamBName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { matchId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await apiClient.get(`/matches/${matchId}`);
        setTeamAName(res.data.team_a);
        setTeamBName(res.data.team_b);
        if (res.data.winner) {
          setWinner(res.data.winner);
        } else if (res.data.is_draw) {
          setWinner("draw");
        }
      } catch (error) {
        console.error("Error fetching match:", error);
      }
    };

    fetchMatch();
  }, [matchId]);

  const handleUpdateWinner = async () => {
    if (!winner) {
      alert("Please select a result");
      return;
    }

    try {
      setLoading(true);
      if (winner === "draw") {
        await apiClient.patch(`/matches/${matchId}/draw`);
      } else {
        await apiClient.patch(`/matches/${matchId}/winner/${winner}`);
      }
      alert("Match result updated successfully!");
      router.push("/admin/matches");
    } catch (error) {
      console.error("Error updating match result:", error);
      const errorMessage = error instanceof Error && 'response' in error
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
        : "Failed to update match result";
      alert(errorMessage || "Failed to update match result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-white">Update Match Result</h1>
        <p className="text-gray-400 mt-1">
          Declare the winner or mark as draw
        </p>
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-center mb-8">
          <Award className="w-12 h-12 text-yellow-500" />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Select Match Result
          </label>

          <div className="space-y-3">
            <button
              onClick={() => setWinner(teamAName)}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                winner === teamAName
                  ? "border-green-500 bg-green-500/20"
                  : "border-gray-700 bg-gray-800 hover:border-gray-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{teamAName}</span>
                {winner === teamAName && (
                  <Trophy className="w-5 h-5 text-green-500" />
                )}
              </div>
            </button>

            <button
              onClick={() => setWinner(teamBName)}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                winner === teamBName
                  ? "border-green-500 bg-green-500/20"
                  : "border-gray-700 bg-gray-800 hover:border-gray-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{teamBName}</span>
                {winner === teamBName && (
                  <Trophy className="w-5 h-5 text-green-500" />
                )}
              </div>
            </button>

            <button
              onClick={() => setWinner("draw")}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                winner === "draw"
                  ? "border-yellow-500 bg-yellow-500/20"
                  : "border-gray-700 bg-gray-800 hover:border-gray-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Draw</span>
                {winner === "draw" && (
                  <Award className="w-5 h-5 text-yellow-500" />
                )}
              </div>
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-center space-x-4">
          <button
            onClick={handleUpdateWinner}
            disabled={loading || !winner}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium"
          >
            <Trophy className="w-5 h-5" />
            <span>{loading ? "Updating..." : "Update Result"}</span>
          </button>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
