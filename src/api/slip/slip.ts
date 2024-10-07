import { AxiosResponse } from "axios";
import { apiClient } from "../axios";

interface createMySlipDto {
    total: number;
    lines: Slip[];
}

interface Slip {
    match_id: string;
    rate: number;
    betting_on: string;
}

const createMySlip = async (slip: createMySlipDto) => {
    try {
        const response: AxiosResponse = await apiClient.post(`/bills`, { slip })

        if (response.status == 200) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch(error) {
        console.error(error)
    }
}

interface getMySlipHistoryDto {
    id: string;
    total: number;
    user_id: string;
    lines: Bill[];
}

export interface Bill {
    bill_id: string;
    match_id: string;
    rate: number;
    betting_on: string;
    match: Match;
}

interface Match {
    id: string;
    team_a: string;
    team_b: string;
    team_a_score: number;
    team_b_score: number;
    team_a_rate: number;
    team_b_rate: number;
    winner: string;
    type: string;
    start_time: string;
    end_time: string;
}
const getMySlipHistory = async () => {
    try {
        const response: AxiosResponse<getMySlipHistoryDto> = await apiClient.get(`/bills`)

        if (response.status == 200) {
            return { success: true, data: response.data }
        }
    } catch(error) {
        console.error(error)
    }
}

export { createMySlip, getMySlipHistory };