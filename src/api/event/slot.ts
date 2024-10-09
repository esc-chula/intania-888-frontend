import { AxiosResponse } from "axios";
import { apiClient } from "../axios";

const getSlot = async (amount: number) => {
    try {
        const response: AxiosResponse = await apiClient.get("/slots")
        
        if (response.status == 200) {
            return { success: true, data: response.data }
        } else {
            return { success: false }
        }
        
    } catch (error) {
        console.error(error)
    }
}

export const loginDaily = async () => {
    try {
        const response: AxiosResponse = await apiClient.get("/events/redeem/daily");
        
        if (response.status == 200) {
            return { success: true}
        } else {
            return { success: false }
        }
        
    } catch (error) {
        console.error(error)
    }
}