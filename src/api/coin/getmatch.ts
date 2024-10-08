import { AxiosResponse } from "axios";
import { apiClient } from "../axios";
import { cleanData } from "@/components/match/MatchUtils";


const getMatch = async () => {
    try {
        const response: AxiosResponse = await apiClient.get("/matches")
        
        if (response.status == 200) {
            const cleanedData = cleanData({ rawData: response.data });
            return { success: true, data :  cleanedData }
        } else {
            return { success: false }
        }
        
    } catch (error) {
        console.error(error)
    }
}

export { getMatch }