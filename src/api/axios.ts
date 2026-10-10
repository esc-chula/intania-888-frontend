"use client";

import axios from "axios";

interface SessionResponse {
  csrf_token: string;
}

const SAFE_METHODS = new Set(["get", "head", "options"]);
let csrfToken: string | null = null;
let csrfRequest: Promise<string | null> | null = null;

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

export const setCsrfToken = (token: string | null) => {
  csrfToken = token;
};

const loadCsrfToken = async (): Promise<string | null> => {
  if (csrfToken) return csrfToken;

  csrfRequest ??= apiClient
    .get<SessionResponse>("/auth/me")
    .then((response) => {
      csrfToken = response.data.csrf_token;
      return csrfToken;
    })
    .finally(() => {
      csrfRequest = null;
    });

  return csrfRequest;
};

apiClient.interceptors.request.use(
  async (config) => {
    const method = config.method?.toLowerCase() ?? "get";
    if (!SAFE_METHODS.has(method)) {
      const token = await loadCsrfToken();
      if (token) config.headers.set("X-CSRF-Token", token);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) setCsrfToken(null);
    return Promise.reject(error);
  },
);
