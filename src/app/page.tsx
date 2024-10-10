"use client";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { handleCallback } from "@/api/auth/google";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      console.error("OAuth error:", error);
      return;
    }

    if (code) {
      const handleOAuthCallback = async () => {
        try {
          const credential = await handleCallback(code);

          localStorage.setItem("credentials", JSON.stringify(credential));
          
          const isProfileComplete = localStorage.getItem("isProfileComplete");

          if (isProfileComplete === "true") {
            router.replace("/match");
          } else {
            router.replace("/register/profile"); 
          }
        } catch (error) {
          console.error("Error processing login callback:", error);
        }
      };

      handleOAuthCallback();
    }
  }, [code, error, router]);

  return (
    <div className="flex flex-col items-center justify-start space-y-4 h-screen">
      <div className="relative m-0 p-0 top-0 flex flex-col w-screen">
        <Header />
        <Navbar pagenow="" />
      </div>
      <p className="text-white text-2xl">Welcome to Intania 888</p>
    </div>
  );
}
