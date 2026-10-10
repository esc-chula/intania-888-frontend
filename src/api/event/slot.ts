import { AxiosError, AxiosResponse } from "axios";
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
  reward: string;
  slots: string[];
  stealToken?: StealToken;
  candidates?: SpinCandidate[];
}

export interface GetSlotResponse {
  success: boolean;
  data?: SpinData;
}

interface DailyRewardStatusResponse {
  claimed: boolean;
}

export const getSlot = async (amount: number) => {
  try {
    const response: AxiosResponse = await apiClient.post(
      `/events/spin/slot?spendAmount=${amount.toFixed(2)}`,
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
      return { status: "claimed" as const };
    } else {
      return { status: "error" as const };
    }
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.status === 409 &&
      error.response.data?.code === "DAILY_REWARD_ALREADY_CLAIMED"
    ) {
      return { status: "already-claimed" as const };
    }

    console.error(error);
    return { status: "error" as const };
  }
};

export const getDailyRewardStatus = async () => {
  try {
    const response = await apiClient.get<DailyRewardStatusResponse>(
      "/events/redeem/daily/status",
    );

    return { success: true as const, claimed: response.data.claimed };
  } catch (error) {
    if (!(error instanceof AxiosError && error.response?.status === 404)) {
      console.error(error);
    }
    return { success: false as const };
  }
};
