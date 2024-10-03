"use client";

import { AxiosResponse } from "axios";
import { apiClient } from "./axios";

const handleGoogleLogin = async () => {
    try {
        localStorage.setItem('redirect_uri', window.location.href);
        const response: AxiosResponse = await apiClient.get("/auth/login");

        const { url } = response.data;
        window.location.href = url;
    } catch (error) {
        console.error(error);
    }
}

export { handleGoogleLogin };