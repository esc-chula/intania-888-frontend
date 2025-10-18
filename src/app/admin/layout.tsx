"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/api/axios";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await apiClient.get("/auth/me");
        const authorizedAdmins = [
          "6633165121@student.chula.ac.th",
          "6738086221@student.chula.ac.th",
          "6633149121@student.chula.ac.th",
        ];
        if (!authorizedAdmins.includes(response.data.profile.email)) {
          router.replace("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.replace("/register");
      }
    };

    checkUser();
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
