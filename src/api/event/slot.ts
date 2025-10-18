import { AxiosResponse } from "axios";
import { apiClient } from "../axios";

export interface StealToken {
  token: string;
  expires_at: string;
  victim_count: number;
  message: string;
}

export interface SpinCandidate {
  index: number;
  name: string;
  role_id: string;
  group_id: string | null;
}

export interface SpinData {
  reward: number;
  slots: string[];
  stealToken?: StealToken;
  candidates?: SpinCandidate[];
}

export interface GetSlotResponse {
  success: boolean;
  data?: SpinData;
}

export const getSlot = async (amount: number) => {
  try {
    const response: AxiosResponse = await apiClient.post(
      `/events/spin/slot?spendAmount=${amount}`
    );
    if (response.status == 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error(error);
  }
};

export const loginDaily = async () => {
  try {
    const response: AxiosResponse = await apiClient.get("/events/redeem/daily");

    if (response.status == 200) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error(error);
  }
};
