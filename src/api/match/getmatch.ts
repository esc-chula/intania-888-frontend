import { AxiosResponse } from "axios";
import { apiClient } from "../axios";
import { cleanData } from "@/components/match/MatchUtils";


const getMatch = async () => {
    try {
        const response: AxiosResponse = await apiClient.get("/matches")
        const dateNow = new Date((await apiClient.get("/matches/current/time")).data.currentTime)
        if (response.status == 200) {
            const cleanedData = cleanData({ rawData: response.data, dateNow });
            return { success: true, data :  cleanedData }
        } else {
            return { success: false }
        }
        
    } catch (error) {
        console.error(error)
    }
}


export { getMatch }