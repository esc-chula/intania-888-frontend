import { apiClient } from "../axios";

interface UpdateProfileDto {
    nickName: string;
    groupId: string;
}

const handleUpdateProfile = async (
    profileInfo: UpdateProfileDto
): Promise<boolean> => {
    try {
        await apiClient.patch(
            "/users/me",
            {
                nick_name: profileInfo.nickName,
                group_id: profileInfo.groupId,
            }
        );

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export { handleUpdateProfile }
