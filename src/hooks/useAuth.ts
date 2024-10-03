"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/utils/axios";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await apiClient.get("/auth/me");
                setUser(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();

        return () => {
            setUser(null);
            setLoading(true);
        };
    }, []);

    return { user, loading };
}

export default useAuth;