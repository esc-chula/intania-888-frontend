import { AxiosResponse } from "axios";
import { apiClient } from "../axios";

export interface GetSlotResponse {
    success: boolean;
    data?: {
        reward: number;
        slots: string[];
    };
}

const getSlot = async (amount: number) => {
    try {
        const response: AxiosResponse = await apiClient.post(`/events/spin/slot?spendAmount=${amount}`)
        console.log(response);
        if (response.status == 200) {
            return { success: true, data: response.data }
        } else {
            return { success: false }
        }
        
    } catch (error) {
        console.error(error)
    }
}

export { getSlot };