import { AxiosResponse } from "axios";
import { apiClient } from "../axios";

export const addUserCoins = async (amount: number) => {
    try {
        const profile = (await apiClient.get("/auth/me")).data.profile;
        const response: AxiosResponse = await apiClient.patch(`/users/${profile.id}`, {
            "remaining_coin": profile.remaining_coin + amount
        });

        if (response.status == 200) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        console.error(error)
    }
}