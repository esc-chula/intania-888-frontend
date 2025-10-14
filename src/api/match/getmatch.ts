import { AxiosResponse } from "axios";
import { apiClient } from "../axios";
import { cleanData } from "@/components/match/MatchUtils";


const getMatch = async () => {
    try {
        const response: AxiosResponse = await apiClient.get("/matches")
        const dateNow = new Date(new Date((await apiClient.get("/matches/current/time")).data.currentTime).getTime() + (7 * 60 * 60 * 1000));

        if (response.status == 200) {
            const cleanedData = cleanData({ rawData: response.data, dateNow });
            return { success: true, data :  cleanedData }
        } else {
            return { success: false }
        }

    } catch (error: any) {
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