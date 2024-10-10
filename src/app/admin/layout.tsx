"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/api/axios";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await apiClient.get("/auth/me");
        if (response.data.profile.email !== "6633149121@student.chula.ac.th") {
          router.replace("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.replace("/login");
      }
    };

    checkUser();
  }, [router]);

  return (
    <>
      {children}
    </>
  );
}
