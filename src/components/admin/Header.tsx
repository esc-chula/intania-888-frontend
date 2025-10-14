"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/api/axios";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get("/auth/me");
        setUser(response.data.profile);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/register");
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Admin Dashboard</h2>
          <p className="text-sm text-gray-400">Manage your Intania 888 platform</p>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <User className="w-5 h-5" />
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
