import { useRouter } from "next/router";
import { useEffect } from "react";
import { apiClient } from "@/utils/axios";

const LoginCallback = () => {
    const router = useRouter();

    useEffect(() => {
        const { code, error } = router.query;

        if (error) {
            console.error('OAuth error:', error);
            return;
        }

        if (code) {
            const sendCallback = async () => {
                try {
                    const response = await apiClient.post(`/auth/login/callback`, { code }, { withCredentials: true });

                    if (response.status === 200) {
                        const { credentials } = response.data;
                        localStorage.setItem('credentials', JSON.stringify(credentials));
                        router.replace('/');
                    }
                    
                } catch (error) {
                    console.error(error);
                }
            };
            sendCallback();
        }
    }, [router])

    return <div>Processing Login</div>
}

export default LoginCallback;