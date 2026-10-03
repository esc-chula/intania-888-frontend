import { AxiosResponse } from "axios";
import { apiClient } from "../axios";

const handleGoogleLogin = async () => {
    try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        if (!apiBaseUrl) {
            throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
        }

        const loginUrl = new URL(`${apiBaseUrl.replace(/\/$/, "")}/auth/login`);
        loginUrl.searchParams.set("client_id", "intania-888-web");
        loginUrl.searchParams.set("return_to", "/");

        // The session-based auth endpoint is a browser redirect, not a JSON API.
        window.location.assign(loginUrl.toString());
    } catch (error) {
        console.error(error);
    }
}

const handleCallback = async (code: string) => {
    try {
        console.log("Sending code to backend:", code);
        const response: AxiosResponse = await apiClient.post('/auth/login/callback', { code })
        console.log("Backend response:", response.data);

        const { credential } = response.data;

        return credential;
    } catch (error) {
        console.error("Backend callback error:", error);
        throw error;
    }
}

export { handleGoogleLogin, handleCallback };
