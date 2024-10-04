import { AxiosResponse } from "axios";
import { apiClient } from "../axios";

interface UpdateProfileDto {
    nickName: string;
    groupId: string;
}


const handleUpdateProfile = async (userId: string, profileInfo: UpdateProfileDto) => {
    try {
        const response: AxiosResponse = await apiClient.patch(`/users/${userId}`, {
            nick_name: profileInfo.nickName,
            group_id: profileInfo.groupId,
        })

        if (response.status == 200) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        console.error(error)
    }
}

export { handleUpdateProfile }