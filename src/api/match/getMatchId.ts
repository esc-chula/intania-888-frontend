import { AxiosResponse } from "axios";
import { apiClient } from "../axios";

const getMatchById = async (id: string) => {
    try {
        const response: AxiosResponse = await apiClient.get(`/matches/${id}`)
        
        if (response.status == 200) {
            return { success: true, data: response.data }
        } else {
            return { success: false }
        }
        
    } catch (error) {
        console.error(error)
    }
}

export { getMatchById }; 