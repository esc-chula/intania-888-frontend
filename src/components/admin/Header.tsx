"use client";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const router = useRouter();
  const { profile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/register");
    } catch (error) {
      console.error("Unable to confirm logout:", error);
    }
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Admin Dashboard</h2>
          <p className="text-sm text-gray-400">Manage your Intania 888 platform</p>
        </div>

        {profile && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <User className="w-5 h-5" />
              <div>
                <p className="text-sm font-medium">{profile.name}</p>
                <p className="text-xs text-gray-400">{profile.email}</p>
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
