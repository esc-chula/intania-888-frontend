"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/api/axios";
import {
  Trophy,
  Users,
  TrendingUp,
  Calendar,
  ArrowRight,
} from "lucide-react";

interface DashboardStats {
  totalMatches: number;
  liveMatches: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalMatches: 0,
    liveMatches: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const matchesRes = await apiClient.get("/matches");

      let totalMatches = 0;
      let liveMatches = 0;
      const now = new Date();

      matchesRes.data.forEach((day: any) => {
        day.types.forEach((sportType: any) => {
          totalMatches += sportType.matches.length;
          sportType.matches.forEach((match: any) => {
            const start = new Date(match.start_time);
            const end = new Date(match.end_time);
            if (now >= start && now <= end && !match.winner && !match.is_draw) {
              liveMatches++;
            }
          });
        });
      });

      setStats({
        totalMatches,
        liveMatches,
        totalUsers: 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Matches",
      value: stats.totalMatches,
      icon: Trophy,
      color: "bg-blue-500",
      href: "/admin/matches",
    },
    {
      title: "Live Matches",
      value: stats.liveMatches,
      icon: Calendar,
      color: "bg-red-500",
      href: "/admin/matches",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-green-500",
      href: "/admin/users",
    },
  ];

  const quickActions = [
    {
      title: "Create Match",
      description: "Add a new match to the system",
      icon: Trophy,
      href: "/admin/matches/create",
      color: "bg-blue-600",
    },
    {
      title: "Manage Matches",
      description: "View and update all matches",
      icon: Calendar,
      href: "/admin/matches",
      color: "bg-purple-600",
    },
    {
      title: "Manage Colors",
      description: "Configure team colors and groups",
      icon: TrendingUp,
      href: "/admin/colors",
      color: "bg-green-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Welcome back! Here's what's happening with Intania 888.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <button
              key={index}
              onClick={() => router.push(card.href)}
              className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">{card.title}</p>
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </button>
          );
        })}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => router.push(action.href)}
                className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors text-left group"
              >
                <div className={`${action.color} p-3 rounded-lg w-fit mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center justify-between">
                  {action.title}
                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-gray-400 text-sm">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">System Status</h2>
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-white">All systems operational</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
