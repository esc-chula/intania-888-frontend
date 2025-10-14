"use client";
import { useEffect, useState } from "react";
import { Calendar, AlertCircle } from "lucide-react";

interface SportType {
  id: string;
  title: string;
}

export default function SportTypesPage() {
  const [sportTypes, setSportTypes] = useState<SportType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSportTypes();
  }, []);

  const fetchSportTypes = async () => {
    setLoading(true);
    // Hardcoded sport types from migration script with emojis
    const sportTypes = [
      { id: "FOOTBALL_MALE_JR", title: "⚽ ฟุตบอล ชาย ปี1" },
      { id: "FOOTBALL_MALE_SR", title: "⚽ ฟุตบอล ชาย ปี2-4" },
      { id: "BASKETBALL_MALE_JR", title: "🏀 บาสเกตบอล ชาย ปี1" },
      { id: "BASKETBALL_MALE_SR", title: "🏀 บาสเกตบอล ชาย ปี2-4" },
      { id: "BASKETBALL_FEMALE_ALL", title: "🏀 บาสเกตบอล หญิง ทุกชั้นปี" },
      { id: "VOLLEYBALL_MALE_ALL", title: "🏐 วอลเลย์บอล ชาย ทุกชั้นปี" },
      { id: "VOLLEYBALL_FEMALE_ALL", title: "🏐 วอลเลย์บอล หญิง ทุกชั้นปี" },
      { id: "CHAIRBALL_FEMALE_JR", title: "🤾 แชร์บอล หญิง ปี1" },
      { id: "CHAIRBALL_FEMALE_SR", title: "🤾 แชร์บอล หญิง ปี2-4" },
    ];
    setSportTypes(sportTypes);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-lg">Loading sport types...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Sport Types</h1>
          <p className="text-gray-400 mt-1">View all sport types in the system</p>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-300 font-medium">Read-Only Data</p>
            <p className="text-blue-200/80 text-sm mt-1">
              Sport types are defined in the backend migration script and cannot be modified from the admin panel.
              To add or modify sport types, update the migration script in the backend code.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sportTypes.map((sport, index) => (
          <div key={sport.id} className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-400">#{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{sport.id}</h3>
                <p className="text-gray-300 text-2xl">{sport.title}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-800">
              <span className="text-xs text-gray-500">
                Defined in migration script
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Sport Types Reference</h2>
        <div className="space-y-2 text-sm">
          <p className="text-gray-300">
            <span className="font-medium text-white">Total Sport Types:</span> {sportTypes.length}
          </p>
          <p className="text-gray-300">
            <span className="font-medium text-white">Source:</span>{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">
              pkg/database/migration/migration_script.go
            </code>
          </p>
          <p className="text-gray-300">
            <span className="font-medium text-white">Constants:</span>{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">
              utils/constant/sport.type.go
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}
