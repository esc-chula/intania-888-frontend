import { apiClient } from "../axios";

interface UpdateProfileDto {
    nickName: string;
    groupId: string;
}

const handleUpdateProfile = async (
    profileInfo: UpdateProfileDto,
    csrfToken: string
): Promise<boolean> => {
    try {
        await apiClient.patch(
            "/users/me",
            {
                nick_name: profileInfo.nickName,
                group_id: profileInfo.groupId,
            },
            {
                headers: {
                    "X-CSRF-Token": csrfToken,
                },
            }
        );

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export { handleUpdateProfile }
