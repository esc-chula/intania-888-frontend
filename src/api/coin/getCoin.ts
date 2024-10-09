import { AxiosResponse } from "axios";
import { apiClient } from "../axios";

export const getUserCoins = async (userId: string) => {
    try {
        const response: AxiosResponse = await apiClient.get(`/users/${userId}`)
        
        if (response.status == 200) {
            return { success: true , data : response.data.remaining_coin}
        } else {
            return { success: false }
        }
    } catch (error) {
        console.error(error)
    }
}

export const getAllUser = async () => {
    try {
        const response: AxiosResponse = await apiClient.get(`/users`)

        if (response.status == 200) {
            return { success: true, data: response.data }
        } else {
            return { success: false }
        }
    } catch (error) {
        console.error(error)
    }
}

