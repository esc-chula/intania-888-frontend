import { AxiosResponse } from "axios";
import { apiClient } from "../axios";
import { cleanData } from "@/components/match/MatchUtils";

export type MatchSchedule = "schedule" | "result";

interface GetMatchOptions {
    schedule?: MatchSchedule;
    typeId?: string;
}

interface CurrentMatchTimeResponse {
    currentTime: string;
}

const getMatch = async (options: GetMatchOptions = {}) => {
    try {
        const [response, timeResponse] = await Promise.all([
            apiClient.get("/matches", {
                params: {
                    schedule: options.schedule,
                    typeId: options.typeId,
                },
            }),
            apiClient.get<CurrentMatchTimeResponse>("/matches/current/time"),
        ]);

        if (response.status == 200) {
            const serverTime = new Date(timeResponse.data.currentTime);
            if (Number.isNaN(serverTime.getTime())) {
                throw new Error("Invalid current match time response");
            }

            const cleanedData = cleanData({
                rawData: response.data,
                dateNow: serverTime,
            });
            return { success: true, data :  cleanedData }
        } else {
            return { success: false }
        }

    } catch (error) {
        return { success: false, error }
    }
}

export const getMatchSub = async ({type_id, group_id}:{type_id:string, group_id:string}) => {
    try {
        const response: AxiosResponse = await apiClient.get("/colors/group-stage", {
            params : {
                type_id, group_id
            }
        })
        if (response.status == 200) {
           
            return { success: true, data :  response.data }
        } else {
            return { success: false }
        }
        
    } catch (error) {
        console.error(error)
    }
}

export { getMatch }
