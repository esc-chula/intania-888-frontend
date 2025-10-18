import { apiClient } from "@/api/axios";

export const getAccessToken = (): string | null => {
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
        const parsed = JSON.parse(credentials);
        return parsed.access_token || null;
    }
    return null;
};

export const refreshToken = async () => {
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
        const parsed = JSON.parse(credentials);
        const refresh_token = parsed.refresh_token || null;
        const response = await apiClient.post('/auth/refresh', {
            refresh_token: refresh_token
        })
        const credential = response.data;

        localStorage.setItem('credentials', JSON.stringify(credential));
    }
}
