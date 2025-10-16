import { AxiosResponse } from "axios";
import { apiClient } from "../axios";

export type MineType = "hidden" | "diamond" | "bomb";

export interface GridTile {
  index: number;
  type: MineType;
  revealed: boolean;
}

export interface Game {
  id: string;
  user_id: string;
  bet_amount: number;
  risk_level: string;
  grid: GridTile[];
  revealed_count: number;
  current_payout: number;
  multiplier: number;
  status: "active" | "lost"
  created_at: string;
  completed_at?: string | null;
}

export interface RevealApiResponse {
  message: string;
  game: Game;
}

export const createGame = async (bet_amount: number, risk_level: string) => {
    try {
        const response: AxiosResponse = await apiClient.post(`/mines/create`, {bet_amount, risk_level})
        if (response.status == 200) {
            return { success: true, data: response.data }
        } else {
            return { success: false }
        }
        
    } catch (error) {
        console.error(error)
    }
}

export const revealTile = async (index: number, gameId: string) => {
    try {
        const response = await apiClient.post(`/mines/${gameId}/reveal`, { index });
        
        if (response.status == 200) {
            return { success: true, data: response.data}
        } else {
            return { success: false }
        }
        
    } catch (error) {
        console.error(error)
    }
}

export const cashOut = async (gameId: string) => {
    try {
        const response = await apiClient.post(`/mines/${gameId}/cashout`);
        
        if (response.status == 200) {
            return { success: true, data: response.data}
        } else {
            return { success: false }
        }
        
    } catch (error) {
        console.error(error)
    }
}

export const getActive = async () => {
    try {
        const response = await apiClient.get(`/mines/active`);
        
        if (response.status == 200) {
            return { success: true, data: response.data}
        } else {
            return { success: false }
        }
        
    } catch (error) {
        console.error(error)
    }
}