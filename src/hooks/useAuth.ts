"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/api/axios";

interface Profile {
    id: string;
    email: string;
    name: string;
    nickName: string;
    roleId: string;
    groupId: string;
    remainingCoin: number;
}

interface GetMeResponse {
    profile: Profile;
}

const useAuth = () => {
    const [user, setUser] = useState<GetMeResponse | null>(null);
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