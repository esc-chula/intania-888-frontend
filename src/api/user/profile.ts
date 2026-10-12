import { apiClient } from "../axios";

interface UpdateProfileDto {
    nickName: string;
}

interface RegisterProfileDto extends UpdateProfileDto {
    groupId: string;
}

export const registerProfile = async (profileInfo: RegisterProfileDto) => {
    await apiClient.post("/users/me/registration", {
        nick_name: profileInfo.nickName,
        group_id: profileInfo.groupId,
    });
};

const handleUpdateProfile = async (
    profileInfo: UpdateProfileDto
): Promise<boolean> => {
    try {
        await apiClient.patch(
            "/users/me",
            {
                nick_name: profileInfo.nickName,
            }
        );

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export { handleUpdateProfile }
