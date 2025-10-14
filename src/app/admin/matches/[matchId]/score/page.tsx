"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiClient } from "@/api/axios";
import { ArrowLeft, Save, Trophy, Plus, Minus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function UpdateScore() {
  const [teamAScore, setTeamAScore] = useState<number>(0);
  const [teamBScore, setTeamBScore] = useState<number>(0);
  const [teamAId, setTeamAId] = useState<string>("");
  const [teamBId, setTeamBId] = useState<string>("");
  const [teamAName, setTeamAName] = useState<string>("");
  const [teamBName, setTeamBName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { matchId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await apiClient.get(`/matches/${matchId}`);
        setTeamAScore(res.data.team_a_score ?? 0);
        setTeamBScore(res.data.team_b_score ?? 0);
        setTeamAId(res.data.team_a);
        setTeamBId(res.data.team_b);

        // Fetch color names
        const colorsRes = await apiClient.get("/colors/leaderboards");
        const teamA = colorsRes.data.find((c: { id: string }) => c.id === res.data.team_a);
        const teamB = colorsRes.data.find((c: { id: string }) => c.id === res.data.team_b);
        setTeamAName(teamA?.title || res.data.team_a);
        setTeamBName(teamB?.title || res.data.team_b);
      } catch (error) {
        console.error("Error fetching match:", error);
      }
    };

    fetchMatch();
  }, [matchId]);

  const handleUpdateScoreAndResult = async () => {
    try {
      setLoading(true);

      // Update score
      await apiClient.patch(`/matches/${matchId}/score`, {
        team_a_score: teamAScore,
        team_b_score: teamBScore,
      });

      // Automatically determine winner based on score
      if (teamAScore > teamBScore) {
        await apiClient.patch(`/matches/${matchId}/winner/${teamAId}`);
      } else if (teamBScore > teamAScore) {
        await apiClient.patch(`/matches/${matchId}/winner/${teamBId}`);
      } else {
        // It's a draw
        await apiClient.patch(`/matches/${matchId}/draw`);
      }

      toast.success("Score and result updated successfully!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#10b981",
          color: "#fff",
          fontWeight: "bold",
        },
      });
      setTimeout(() => router.push("/admin/matches"), 1000);
    } catch (error) {
      console.error("Error updating score:", error);
      const errorMessage = error instanceof Error && 'response' in error
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
        : "Failed to update score";
      toast.error(errorMessage || "Failed to update score", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#ef4444",
          color: "#fff",
          fontWeight: "bold",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const getWinnerPreview = () => {
    if (teamAScore > teamBScore) {
      return <span className="text-green-400">{teamAName} wins!</span>;
    } else if (teamBScore > teamAScore) {
      return <span className="text-green-400">{teamBName} wins!</span>;
    } else {
      return <span className="text-yellow-400">It&apos;s a draw!</span>;
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-2xl">
        <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-white">Update Match Score & Result</h1>
        <p className="text-gray-400 mt-1">
          Update the final score - winner will be determined automatically
        </p>
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-center mb-8">
          <Trophy className="w-12 h-12 text-blue-500" />
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              {teamAName || "Team A"} Score
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTeamAScore(Math.max(0, teamAScore - 1))}
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <Minus className="w-6 h-6" />
              </button>
              <input
                type="number"
                min="0"
                value={teamAScore}
                onChange={(e) => setTeamAScore(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-3xl font-bold text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => setTeamAScore(teamAScore + 1)}
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="text-center text-2xl font-bold text-gray-500">VS</div>

          <div className="bg-gray-800 rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              {teamBName || "Team B"} Score
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTeamBScore(Math.max(0, teamBScore - 1))}
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <Minus className="w-6 h-6" />
              </button>
              <input
                type="number"
                min="0"
                value={teamBScore}
                onChange={(e) => setTeamBScore(Math.max(0, Number(e.target.value)))}
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-3xl font-bold text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => setTeamBScore(teamBScore + 1)}
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-400 mb-2">Result Preview:</p>
            <p className="text-lg font-bold">{getWinnerPreview()}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center space-x-4">
          <button
            onClick={handleUpdateScoreAndResult}
            disabled={loading}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? "Updating..." : "Update Score & Result"}</span>
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
    </>
  );
}
