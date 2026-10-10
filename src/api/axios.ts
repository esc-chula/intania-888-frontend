"use client";
import axios from 'axios';

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

apiClient.interceptors.request.use(
  async (config) => {
    const method = config.method?.toLowerCase() ?? "get";

    if (!SAFE_METHODS.has(method)) {
      if (!csrfToken) {
        csrfRequest ??= apiClient
          .get<SessionResponse>("/auth/me")
          .then((response) => response.data.csrf_token)
          .finally(() => {
            csrfRequest = null;
          });

        csrfToken = await csrfRequest;
      }

      if (csrfToken) config.headers.set("X-CSRF-Token", csrfToken);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) csrfToken = null;
    return Promise.reject(error);
  },
);
