"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  Users,
  Palette,
  BarChart3,
  Calendar,
  Settings
} from "lucide-react";

const menuItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/matches",
    label: "Matches",
    icon: Trophy,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
  },
  {
    href: "/admin/colors",
    label: "Colors & Teams",
    icon: Palette,
  },
  {
    href: "/admin/statistics",
    label: "Statistics",
    icon: BarChart3,
  },
  {
    href: "/admin/sports",
    label: "Sport Types",
    icon: Calendar,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-8">Intania 888</h1>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
