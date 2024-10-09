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