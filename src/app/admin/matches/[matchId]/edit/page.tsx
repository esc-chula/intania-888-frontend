"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiClient } from "@/api/axios";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

interface Color {
  id: string;
  title: string;
}

interface SportType {
  id: string;
  title: string;
}

interface Match {
  id: string;
  team_a: string;
  team_b: string;
  team_a_score: number | null;
  team_b_score: number | null;
  winner: string;
  type: string;
  is_draw: boolean;
  start_time: string;
  end_time: string;
}

export default function EditMatchPage() {
  const router = useRouter();
  const { matchId } = useParams();
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState<Color[]>([]);
  const [sportTypes, setSportTypes] = useState<SportType[]>([]);
  const [match, setMatch] = useState<Match | null>(null);

  const [formData, setFormData] = useState({
    team_a_id: "",
    team_b_id: "",
    type_id: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    fetchData();
  }, [matchId]);

  const fetchData = async () => {
    try {
      const [matchRes, colorsRes] = await Promise.all([
        apiClient.get(`/matches/${matchId}`),
        apiClient.get("/colors/leaderboards"),
      ]);

      setMatch(matchRes.data);
      setColors(colorsRes.data);

      // Hardcoded sport types from migration script
      const sportTypes = [
        { id: "FOOTBALL_MALE_JR", title: "ฟุตบอล ชาย ปี1" },
        { id: "FOOTBALL_MALE_SR", title: "ฟุตบอล ชาย ปี2-4" },
        { id: "BASKETBALL_MALE_JR", title: "บาสเกตบอล ชาย ปี1" },
        { id: "BASKETBALL_MALE_SR", title: "บาสเกตบอล ชาย ปี2-4" },
        { id: "BASKETBALL_FEMALE_ALL", title: "บาสเกตบอล หญิง ทุกชั้นปี" },
        { id: "VOLLEYBALL_MALE_ALL", title: "วอลเลย์บอล ชาย ทุกชั้นปี" },
        { id: "VOLLEYBALL_FEMALE_ALL", title: "วอลเลย์บอล หญิง ทุกชั้นปี" },
        { id: "CHAIRBALL_FEMALE_JR", title: "แชร์บอล หญิง ปี1" },
        { id: "CHAIRBALL_FEMALE_SR", title: "แชร์บอล หญิง ปี2-4" },
      ];
      setSportTypes(sportTypes);

      // Set form data from match
      const matchData = matchRes.data;
      setFormData({
        team_a_id: matchData.team_a,
        team_b_id: matchData.team_b,
        type_id: matchData.type,
        start_time: new Date(matchData.start_time).toISOString().slice(0, 16),
        end_time: new Date(matchData.end_time).toISOString().slice(0, 16),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to load match data");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.team_a_id ||
      !formData.team_b_id ||
      !formData.type_id ||
      !formData.start_time ||
      !formData.end_time
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.team_a_id === formData.team_b_id) {
      alert("Teams must be different");
      return;
    }

    try {
      setLoading(true);
      await apiClient.put(`/matches/${matchId}`, {
        team_a: formData.team_a_id,
        team_b: formData.team_b_id,
        type: formData.type_id,
        start_time: new Date(formData.start_time).toISOString(),
        end_time: new Date(formData.end_time).toISOString(),
      });
      alert("Match updated successfully!");
      router.push("/admin/matches");
    } catch (error: any) {
      console.error("Error updating match:", error);
      alert(error.response?.data?.message || "Failed to update match");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this match? This action cannot be undone and will affect all related bets."
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      await apiClient.delete(`/matches/${matchId}`);
      alert("Match deleted successfully!");
      router.push("/admin/matches");
    } catch (error: any) {
      console.error("Error deleting match:", error);
      alert(error.response?.data?.message || "Failed to delete match");
    } finally {
      setLoading(false);
    }
  };

  if (!match) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-lg">Loading match data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-white">Edit Match</h1>
        <p className="text-gray-400 mt-1">Update match details or delete the match</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Sport Type *</label>
          <select
            value={formData.type_id}
            onChange={(e) => setFormData({ ...formData, type_id: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select sport type</option>
            {sportTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Team A *</label>
            <select
              value={formData.team_a_id}
              onChange={(e) => setFormData({ ...formData, team_a_id: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select team</option>
              {colors.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Team B *</label>
            <select
              value={formData.team_b_id}
              onChange={(e) => setFormData({ ...formData, team_b_id: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select team</option>
              {colors.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Start Time *</label>
            <input
              type="datetime-local"
              value={formData.start_time}
              onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">End Time *</label>
            <input
              type="datetime-local"
              value={formData.end_time}
              onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 pt-4 border-t border-gray-800">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? "Updating..." : "Update Match"}</span>
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            <span>Delete</span>
          </button>
        </div>
      </form>
    </div>
  );
}
