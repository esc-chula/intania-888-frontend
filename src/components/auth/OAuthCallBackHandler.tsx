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
          if (process.env.NODE_ENV === "development") {
            console.log("Processing OAuth callback with code:", code);
          }
          const credential = await handleCallback(code);

          if (credential) {
            localStorage.setItem("credentials", JSON.stringify(credential));

            if (credential.is_new_user) {
              router.replace("/register/profile");
            } else {
              router.replace("/");
            }
          } else {
            console.error("No credential received from backend");
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
