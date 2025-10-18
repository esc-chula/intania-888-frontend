import { AxiosResponse } from "axios";
import { apiClient } from "../axios";

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