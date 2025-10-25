"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleCallback } from "@/api/auth/google";

const OAuthCallbackHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");
  const expiresIn = searchParams.get("expires_in");
  const isNewUser = searchParams.get("is_new_user");

  useEffect(() => {
    if (error) {
      console.error("OAuth error:", error);
      return;
    }

    // Handle third-party redirect mode (credentials in URL)
    if (accessToken && refreshToken) {
      const credential = {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn ? parseInt(expiresIn) : 3600,
        is_new_user: isNewUser === "true",
      };

      localStorage.setItem("credentials", JSON.stringify(credential));

      if (credential.is_new_user) {
        router.replace("/register/profile");
      } else {
        router.replace("/");
      }
      return;
    }

    // Handle original mode (exchange code for credentials)
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
  }, [code, error, router, accessToken, refreshToken, expiresIn, isNewUser]);

  return null;
};

export default OAuthCallbackHandler;
