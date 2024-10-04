"use client";
import { EmptyState } from "@/components/EmptyState";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { apiClient } from "@/utils/axios";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  useEffect(() => {
    if (error) {
      console.error("OAuth error:", error);
      return;
    }

    if (code) {
      const handleOAuthCallback = async () => {
        try {
          const response = await apiClient.post(`/auth/login/callback`, { code });

          if (response.status === 200) {
            const credential = response.data.credential;

            localStorage.setItem('credentials', JSON.stringify(credential));

            router.replace('/register/profile');
          }
        } catch (error) {
          console.error('Error processing login callback:', error);
        }
      };

      handleOAuthCallback();
    }
  })

  return (
    <div className="flex flex-col items-center justify-start space-y-4 h-screen">
      <div className="relative m-0 p-0 top-0 flex flex-col w-screen">
        <Header />
        <Navbar pagenow="match" />
      </div>
      <EmptyState
        texts={[
          "หากต้องการทายผล ทำตามขั้นตอนดังนี้",
          "แมตช์ > เลือกแมตช์ที่ต้องการทาย > เพิ่งลงสลิป",
        ]}
      />
    </div>
  );
}
