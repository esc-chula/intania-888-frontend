export const getAccessToken = (): string | null => {
    const credentials = localStorage.getItem("credentials");
    console.log("get credentials: ", credentials);
    if (credentials) {
        const parsed = JSON.parse(credentials);
        return parsed.access_token || null;
    }
    return null;
};
