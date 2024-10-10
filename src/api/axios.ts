"use client";
import axios from 'axios';
import { getAccessToken, refreshToken } from '@/utils/token';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
      const token = getAccessToken();
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response?.status === 401) {
          refreshToken()
      }
      return Promise.reject(error);
  }
);