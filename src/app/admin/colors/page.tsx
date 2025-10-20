"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/api/axios";
import { Palette, Trophy, TrendingUp } from "lucide-react";

interface Color {
  id: string;
  title: string;
  total_matches: number;
  won: number;
  drawn: number;
  members?: string[];
}

export default function ColorsPage() {
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/colors/leaderboards");
      setColors(res.data);
    } catch (error) {
      console.error("Error fetching colors:", error);
    } finally {
      setLoading(false);
    }
  };

  const getColorBg = (colorId: string) => {
    const colorMap: Record<string, string> = {
      VIOLET: "bg-purple-600",
      BLUE: "bg-blue-600",
      GREEN: "bg-green-600",
      PINK: "bg-pink-600",
      ORANGE: "bg-orange-600",
      YELLOW: "bg-yellow-600",
    };
    return colorMap[colorId] || "bg-gray-600";
  };

  const getWinRate = (color: Color) => {
    if (color.total_matches === 0) return 0;
    return ((color.won / color.total_matches) * 100).toFixed(1);
  };

  const colorGroups = {
    VIOLET: ["DOG", "J", "R"],
    BLUE: ["E", "K", "N"],
    GREEN: ["B", "C", "M"],
    PINK: ["G", "H", "T"],
    ORANGE: ["P", "Q", "S"],
    YELLOW: ["A", "F", "L"],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-lg">Loading colors...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Colors & Teams</h1>
          <p className="text-gray-400 mt-1">
            Manage team colors and view leaderboard statistics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colors.map((color) => (
          <div
            key={color.id}
            className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-850 transition-colors"
          >
            <div className={`${getColorBg(color.id)} h-24 flex items-center justify-center`}>
              <div className="text-center">
                <Palette className="w-12 h-12 text-white mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white">{color.title}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Team ID</h4>
                <p className="text-lg font-semibold text-white">{color.id}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Groups</h4>
                <div className="flex flex-wrap gap-2">
                  {(colorGroups[color.id as keyof typeof colorGroups] || []).map((group) => (
                    <span
                      key={group}
                      className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm font-medium"
                    >
                      {group}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Trophy className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">{color.won}</p>
                  <p className="text-xs text-gray-400">Wins</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">{color.drawn}</p>
                  <p className="text-xs text-gray-400">Draws</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <span className="text-gray-400 text-sm">%</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{getWinRate(color)}%</p>
                  <p className="text-xs text-gray-400">Win Rate</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Total Matches</span>
                  <span className="text-white font-medium">{color.total_matches}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Leaderboard</h2>
        <div className="space-y-3">
          {[...colors]
            .sort((a, b) => b.won - a.won)
            .map((color, index) => (
              <div
                key={color.id}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                  <div className={`w-4 h-4 rounded-full ${getColorBg(color.id)}`} />
                  <div>
                    <p className="text-white font-medium">{color.title}</p>
                    <p className="text-sm text-gray-400">{color.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{color.won}</p>
                    <p className="text-xs text-gray-400">Wins</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-green-500">{getWinRate(color)}%</p>
                    <p className="text-xs text-gray-400">Win Rate</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
