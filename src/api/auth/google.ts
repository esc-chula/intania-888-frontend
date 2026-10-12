const handleGoogleLogin = async () => {
    try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID;

        if (!apiBaseUrl || !clientId) {
            throw new Error("Authentication environment is not configured");
        }

        const loginUrl = new URL(`${apiBaseUrl.replace(/\/$/, "")}/auth/login`);
        loginUrl.searchParams.set("client_id", clientId);
        loginUrl.searchParams.set("return_to", "/");

        // The session-based auth endpoint is a browser redirect, not a JSON API.
        window.location.assign(loginUrl.toString());
    } catch (error) {
        console.error(error);
    }
}

export { handleGoogleLogin };
