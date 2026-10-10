"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AxiosError } from "axios";
import { apiClient, setCsrfToken } from "@/api/axios";
import { useCoinStore } from "@/store/coin";

export interface Profile {
  id: string;
  email: string;
  name: string;
  nick_name: string | null;
  role_id: string;
  group_id: string | null;
  remaining_coin: string;
}

export interface AuthSession {
  profile: Profile;
  csrf_token: string;
}

export type AuthStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated"
  | "error";

interface AuthContextValue {
  profile: Profile | null;
  csrfToken: string | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  error: Error | null;
  refreshSession: () => Promise<AuthSession | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [error, setError] = useState<Error | null>(null);
  const setCoinPoint = useCoinStore((state) => state.setCoinPoint);
  const clearCoin = useCoinStore((state) => state.clearCoin);

  const clearSession = useCallback(() => {
    setSession(null);
    setCsrfToken(null);
    clearCoin();
    setStatus("unauthenticated");
  }, [clearCoin]);

  const refreshSession = useCallback(async (): Promise<AuthSession | null> => {
    setError(null);
    try {
      const response = await apiClient.get<AuthSession>("/auth/me");
      setSession(response.data);
      setCsrfToken(response.data.csrf_token);
      setCoinPoint(response.data.profile.remaining_coin);
      setStatus("authenticated");
      return response.data;
    } catch (requestError) {
      if (
        requestError instanceof AxiosError &&
        requestError.response?.status === 401
      ) {
        clearSession();
        return null;
      }

      const nextError =
        requestError instanceof Error
          ? requestError
          : new Error("Unable to load the current session");
      setError(nextError);
      setStatus("error");
      return null;
    }
  }, [clearSession, setCoinPoint]);

  const logout = useCallback(async () => {
    await apiClient.post("/auth/logout");
    clearSession();
  }, [clearSession]);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      profile: session?.profile ?? null,
      csrfToken: session?.csrf_token ?? null,
      status,
      isAuthenticated: status === "authenticated",
      error,
      refreshSession,
      logout,
    }),
    [error, logout, refreshSession, session, status],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

export default useAuth;
