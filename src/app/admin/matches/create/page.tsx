"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/api/axios";
import { ArrowLeft, Save } from "lucide-react";

interface Color {
  id: string;
  title: string;
}

interface SportType {
  id: string;
  title: string;
}

interface Location {
  id: string;
  title: string;
}

export default function CreateMatchPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState<Color[]>([]);
  const [sportTypes, setSportTypes] = useState<SportType[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const [formData, setFormData] = useState({
    team_a_id: "",
    team_b_id: "",
    type_id: "",
    location_id: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    fetchColors();
    fetchSportTypes();
    fetchLocations();
  }, []);

  const fetchColors = async () => {
    try {
      const res = await apiClient.get("/colors/leaderboards");
      setColors(res.data);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  const fetchSportTypes = async () => {
    try {
      const response = await apiClient.get<SportType[]>("/sport-types");
      setSportTypes(response.data);
    } catch (error) {
      console.error("Error fetching sport types:", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await apiClient.get<Location[]>("/locations");
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.team_a_id ||
      !formData.team_b_id ||
      !formData.type_id ||
      !formData.location_id ||
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
      // datetime-local input values are in local time (Bangkok for our users)
      // new Date() treats them as local time and toISOString() converts to UTC
      await apiClient.post("/matches", {
        team_a: formData.team_a_id,
        team_b: formData.team_b_id,
        type: formData.type_id,
        location_id: formData.location_id,
        start_time: new Date(formData.start_time).toISOString(),
        end_time: new Date(formData.end_time).toISOString(),
      });
      alert("Match created successfully!");
      router.push("/admin/matches");
    } catch (error) {
      console.error("Error creating match:", error);
      const errorMessage = error instanceof Error && 'response' in error
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
        : "Failed to create match";
      alert(errorMessage || "Failed to create match");
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-3xl font-bold text-white">Create New Match</h1>
        <p className="text-gray-400 mt-1">
          Set up a new match between two teams
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sport Type *
          </label>
          <select
            value={formData.type_id}
            onChange={(e) =>
              setFormData({ ...formData, type_id: e.target.value })
            }
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

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location *
          </label>
          <select
            value={formData.location_id}
            onChange={(event) =>
              setFormData({ ...formData, location_id: event.target.value })
            }
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.title} ({location.id})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Team A *
            </label>
            <select
              value={formData.team_a_id}
              onChange={(e) =>
                setFormData({ ...formData, team_a_id: e.target.value })
              }
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
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Team B *
            </label>
            <select
              value={formData.team_b_id}
              onChange={(e) =>
                setFormData({ ...formData, team_b_id: e.target.value })
              }
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
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Start Time *
            </label>
            <input
              type="datetime-local"
              value={formData.start_time}
              onChange={(e) =>
                setFormData({ ...formData, start_time: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              End Time *
            </label>
            <input
              type="datetime-local"
              value={formData.end_time}
              onChange={(e) =>
                setFormData({ ...formData, end_time: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? "Creating..." : "Create Match"}</span>
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
