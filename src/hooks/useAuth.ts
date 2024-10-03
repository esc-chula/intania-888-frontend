"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/auth/me", {withCredentials: true});
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