import { AxiosResponse } from "axios";
import { apiClient } from "../axios";
import { createMySlipDto } from "./slip.dto";
import { getMySlipHistoryDto } from "./slip.dto";

const createMySlip = async (slip: createMySlipDto) => {
    try {
        const response: AxiosResponse = await apiClient.post(`/bills`, {
            total: slip.total,
            lines: slip.lines,
        })
        if (response.status == 201) {
            return {
                success: true,
            }
        } else {
            return { success: false }
        }
    } catch(error) {
        console.error(error)
    }
}

const getMySlipHistory = async () => {
    try {
        const response: AxiosResponse<getMySlipHistoryDto[]> = await apiClient.get(`/bills`)

        if (response.status == 200) {
            return { success: true, data: response.data }
        }
    } catch(error) {
        console.error(error)
    }
}

export { createMySlip, getMySlipHistory };