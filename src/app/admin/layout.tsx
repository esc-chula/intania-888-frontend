"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import useAuth from "@/hooks/useAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { profile, status, error, refreshSession } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/register");
    if (status === "authenticated" && profile?.role_id !== "ADMIN") {
      router.replace("/");
    }
  }, [profile?.role_id, router, status]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        Checking administrator access...
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-950 text-white">
        <p>{error?.message ?? "Unable to check administrator access"}</p>
        <button
          type="button"
          onClick={() => void refreshSession()}
          className="rounded bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
        >
          Retry
        </button>
      </div>
    );
  }

  if (status !== "authenticated" || profile?.role_id !== "ADMIN") return null;

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
