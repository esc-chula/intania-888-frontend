"use client";
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

const setAuthorizationHeader = () => {
    const credentials = localStorage.getItem('credentials');
    const accessToken = credentials ? JSON.parse(credentials).accessToken : null;

    if (accessToken) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
}

setAuthorizationHeader();