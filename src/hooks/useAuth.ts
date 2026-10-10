"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/api/axios";
import { AxiosError } from "axios";

export interface Profile {
    id: string;
    email: string;
    name: string;
    nick_name: string | null;
    role_id: string;
    group_id: string | null;
    remaining_coin: string;
}

interface GetMeResponse {
    profile: Profile;
    csrf_token: string;
}

interface UseAuthOptions {
    optional?: boolean;
}

const useAuth = ({ optional = false }: UseAuthOptions = {}) => {
    const [user, setUser] = useState<GetMeResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await apiClient.get("/auth/me");
                setUser(response.data);
            } catch (error) {
                const isUnauthorized =
                    error instanceof AxiosError && error.response?.status === 401;

                if (!optional || !isUnauthorized) {
                    console.error(error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();

        return () => {
            setUser(null);
            setLoading(true);
        };
    }, [optional]);

    return { user, loading };
}

export default useAuth;
