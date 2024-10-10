"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleCallback } from "@/api/auth/google";

const OAuthCallbackHandler = () => {
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
            router.replace("/");
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

  return null;
};

export default OAuthCallbackHandler;
