"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/api/axios";
import { sportTextMap } from "@/components/match/MatchMapAndList";
import { Plus, Edit, Trophy, Clock, CheckCircle, XCircle, Filter } from "lucide-react";

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

interface Color {
  id: string;
  title: string;
}

export default function MatchesPage() {
  const [matchesData, setMatchesData] = useState<MatchDay[]>([]);
  const [filteredData, setFilteredData] = useState<MatchDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState<Color[]>([]);
  const router = useRouter();

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [colorFilter, setColorFilter] = useState<string>("all");
  const [sportFilter, setSportFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  // Hardcoded sport types
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

  useEffect(() => {
    fetchMatches();
    fetchColors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [matchesData, statusFilter, colorFilter, sportFilter, dateFilter]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/matches");
      // Sort days by date, then sort matches within each sport type by start_time
      const sortedData = res.data
        .sort(
          (a: MatchDay, b: MatchDay) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        .map((day: MatchDay) => ({
          ...day,
          types: day.types.map((type: SportType) => ({
            ...type,
            matches: type.matches.sort(
              (a: Match, b: Match) =>
                new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
            ),
          })),
        }));
      setMatchesData(sortedData);
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchColors = async () => {
    try {
      const res = await apiClient.get("/colors/leaderboards");
      setColors(res.data);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  const getMatchStatus = (match: Match) => {
    const now = new Date();
    const start = new Date(match.start_time);
    const end = new Date(match.end_time);

    if (match.winner || match.is_draw) {
      return { label: "Completed", value: "completed", color: "bg-green-500", icon: CheckCircle };
    } else if (now >= start && now <= end) {
      return { label: "Live", value: "live", color: "bg-red-500 animate-pulse", icon: Trophy };
    } else if (now < start) {
      return { label: "Upcoming", value: "upcoming", color: "bg-blue-500", icon: Clock };
    } else {
      return { label: "Ended", value: "ended", color: "bg-gray-500", icon: XCircle };
    }
  };

  const applyFilters = () => {
    let filtered = [...matchesData];

    // Apply filters
    filtered = filtered.map(day => ({
      ...day,
      types: day.types.map(type => ({
        ...type,
        matches: type.matches.filter(match => {
          // Status filter
          if (statusFilter !== "all") {
            const status = getMatchStatus(match);
            if (status.value !== statusFilter) return false;
          }

          // Color filter
          if (colorFilter !== "all") {
            if (match.team_a !== colorFilter && match.team_b !== colorFilter) {
              return false;
            }
          }

          // Sport filter
          if (sportFilter !== "all") {
            if (match.type !== sportFilter) return false;
          }

          // Date filter
          if (dateFilter !== "all") {
            const matchDate = new Date(match.start_time);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const weekFromNow = new Date(today);
            weekFromNow.setDate(weekFromNow.getDate() + 7);

            if (dateFilter === "today" && matchDate.toDateString() !== today.toDateString()) {
              return false;
            }
            if (dateFilter === "tomorrow" && matchDate.toDateString() !== tomorrow.toDateString()) {
              return false;
            }
            if (dateFilter === "week" && (matchDate < today || matchDate > weekFromNow)) {
              return false;
            }
          }

          return true;
        })
      }))
    }));

    // Remove empty days and types
    filtered = filtered
      .map(day => ({
        ...day,
        types: day.types.filter(type => type.matches.length > 0)
      }))
      .filter(day => day.types.length > 0);

    setFilteredData(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-lg">Loading matches...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Match Management</h1>
          <p className="text-gray-400 mt-1">
            Manage all matches, scores, and results
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/matches/create")}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create Match</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="live">Live</option>
              <option value="ended">Ended</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Color/Team Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Team
            </label>
            <select
              value={colorFilter}
              onChange={(e) => setColorFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Teams</option>
              {colors.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.title}
                </option>
              ))}
            </select>
          </div>

          {/* Sport Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sport Type
            </label>
            <select
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Sports</option>
              {sportTypes.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.title}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="week">This Week</option>
            </select>
          </div>
        </div>

        {/* Active Filters Info */}
        {(statusFilter !== "all" || colorFilter !== "all" || sportFilter !== "all" || dateFilter !== "all") && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Filters active: {filteredData.reduce((acc, day) => acc + day.types.reduce((sum, type) => sum + type.matches.length, 0), 0)} matches shown
            </p>
            <button
              onClick={() => {
                setStatusFilter("all");
                setColorFilter("all");
                setSportFilter("all");
                setDateFilter("all");
              }}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {filteredData.length === 0 ? (
        <div className="bg-gray-900 rounded-lg p-12 text-center">
          <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No matches found</p>
          <button
            onClick={() => router.push("/admin/matches/create")}
            className="mt-4 text-blue-500 hover:text-blue-400"
          >
            Create your first match
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredData.map((day: MatchDay, dayIndex: number) => (
            <div key={dayIndex} className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>

              {day.types.map((sportType: SportType, typeIndex: number) => (
                <div key={typeIndex} className="mb-6 last:mb-0">
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">
                    {sportTextMap[sportType.sportType] || sportType.sportType}
                  </h3>

                  <div className="grid gap-4">
                    {sportType.matches.map((match: Match) => {
                      const status = getMatchStatus(match);
                      const StatusIcon = status.icon;

                      return (
                        <div
                          key={match.id}
                          className="bg-gray-800 rounded-lg p-5 hover:bg-gray-750 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <span
                                  className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium text-white ${status.color}`}
                                >
                                  <StatusIcon className="w-3 h-3" />
                                  <span>{status.label}</span>
                                </span>
                                <span className="text-gray-400 text-sm">
                                  {new Date(match.start_time).toLocaleTimeString(
                                    "en-US",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </span>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-white font-medium">
                                      {match.team_a}
                                    </span>
                                    <span className="text-2xl font-bold text-white">
                                      {match.team_a_score ?? "-"}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-white font-medium">
                                      {match.team_b}
                                    </span>
                                    <span className="text-2xl font-bold text-white">
                                      {match.team_b_score ?? "-"}
                                    </span>
                                  </div>
                                </div>

                                <div className="ml-8 text-right">
                                  {match.winner && (
                                    <div className="text-sm">
                                      <p className="text-gray-400">Winner</p>
                                      <p className="text-green-400 font-medium">
                                        {match.winner}
                                      </p>
                                    </div>
                                  )}
                                  {match.is_draw && (
                                    <p className="text-yellow-400 font-medium">
                                      Draw
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="mt-3 flex items-center space-x-4 text-sm text-gray-400">
                                <span>Odds: {match.team_a_rate}x / {match.team_b_rate}x</span>
                              </div>
                            </div>

                            <div className="ml-6 flex flex-col space-y-2">
                              <button
                                onClick={() =>
                                  router.push(`/admin/matches/${match.id}/score`)
                                }
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                              >
                                <Trophy className="w-4 h-4" />
                                <span>Score & Result</span>
                              </button>
                              <button
                                onClick={() =>
                                  router.push(`/admin/matches/${match.id}/edit`)
                                }
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                              >
                                <Edit className="w-4 h-4" />
                                <span>Edit</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
