import { AxiosResponse } from "axios";
import { apiClient } from "../axios";

const getMatch = async () => {
    try {
        const response: AxiosResponse = await apiClient.get(`/matches`)

        if (response.status == 200) {
            return { success: true }
        } else {
            return { success: false }
        }
        
    } catch (error) {
        console.error(error)
    }
}

export { getMatch }