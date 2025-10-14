"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/api/axios";
import { TrendingUp, DollarSign, Users, Trophy, Target, Activity } from "lucide-react";

interface BettingStats {
  totalBets: number;
  totalVolume: number;
  averageBetSize: number;
  mostPopularTeam: string;
  mostPopularSport: string;
}

export default function StatisticsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<BettingStats>({
    totalBets: 0,
    totalVolume: 0,
    averageBetSize: 0,
    mostPopularTeam: "-",
    mostPopularSport: "-",
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      // Fetch all bills using the admin endpoint
      const billsRes = await apiClient.get("/bills/admin/all").catch(() => ({ data: [] }));

      // Calculate stats from bills if available
      const bills = billsRes.data;
      const totalBets = bills.length;
      const totalVolume = bills.reduce((sum: number, bill: any) => sum + bill.total, 0);
      const averageBetSize = totalBets > 0 ? totalVolume / totalBets : 0;

      // Calculate most popular team from bill lines
      const teamCounts: Record<string, number> = {};
      bills.forEach((bill: any) => {
        bill.lines?.forEach((line: any) => {
          const team = line.betting_on;
          teamCounts[team] = (teamCounts[team] || 0) + 1;
        });
      });
      const mostPopularTeam = Object.entries(teamCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "-";

      // Calculate most popular sport from bill lines
      const sportCounts: Record<string, number> = {};
      bills.forEach((bill: any) => {
        bill.lines?.forEach((line: any) => {
          const sportType = line.match?.type;
          if (sportType) {
            sportCounts[sportType] = (sportCounts[sportType] || 0) + 1;
          }
        });
      });
      const mostPopularSport = Object.entries(sportCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "-";

      setStats({
        totalBets,
        totalVolume,
        averageBetSize,
        mostPopularTeam,
        mostPopularSport,
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-lg">Loading statistics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Statistics & Analytics</h1>
        <p className="text-gray-400 mt-1">
          Overview of betting activity and platform performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalBets.toLocaleString()}</p>
          <p className="text-sm text-gray-400 mt-1">Total Bets Placed</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.totalVolume.toLocaleString()} ₿
          </p>
          <p className="text-sm text-gray-400 mt-1">Total Betting Volume</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <span className="text-sm text-gray-400">Avg</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.averageBetSize.toFixed(0)} ₿
          </p>
          <p className="text-sm text-gray-400 mt-1">Average Bet Size</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-white">{stats.mostPopularTeam}</p>
          <p className="text-sm text-gray-400 mt-1">Most Popular Team</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-2xl font-bold text-white">{stats.mostPopularSport}</p>
          <p className="text-sm text-gray-400 mt-1">Most Popular Sport</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-cyan-500" />
            <span className="text-sm text-green-400">Active</span>
          </div>
          <p className="text-3xl font-bold text-white">-</p>
          <p className="text-sm text-gray-400 mt-1">Active Users Today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Betting Trends</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div>
                <p className="text-white font-medium">Today</p>
                <p className="text-sm text-gray-400">Bets placed</p>
              </div>
              <p className="text-2xl font-bold text-white">-</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div>
                <p className="text-white font-medium">This Week</p>
                <p className="text-sm text-gray-400">Bets placed</p>
              </div>
              <p className="text-2xl font-bold text-white">-</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div>
                <p className="text-white font-medium">This Month</p>
                <p className="text-sm text-gray-400">Bets placed</p>
              </div>
              <p className="text-2xl font-bold text-white">{stats.totalBets}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="text-center py-12 text-gray-400">
              <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Betting statistics will be displayed here</p>
              <p className="text-sm mt-1">Connect to /bills endpoint for real-time data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
