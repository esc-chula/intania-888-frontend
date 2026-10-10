import { apiClient } from "../axios";
import { leaderboardDataInterface } from "@/components/ColorLeaderBoardUtils";

const getColorLeaderboard = async (props: { type_id?: string }) => {
    try {
        const response = await apiClient.get<unknown>("/colors/leaderboards", {
            params: props.type_id ? { type_id: props.type_id } : undefined,
        });

        if (!Array.isArray(response.data)) {
            return {
                success: false as const,
                data: [] as leaderboardDataInterface[],
                error: new Error("Invalid color leaderboard response"),
            };
        }

        return {
            success: true as const,
            data: response.data as leaderboardDataInterface[],
        };
    } catch (error) {
        console.error(error);
        return {
            success: false as const,
            data: [] as leaderboardDataInterface[],
            error,
        };
    }
};

export { getColorLeaderboard };
