import { apiClient } from "../axios";

interface UpdateProfileDto {
  nickName: string;
}

interface RegisterProfileDto extends UpdateProfileDto {
  groupId: string;
}

const handleUpdateProfile = async (profileInfo: UpdateProfileDto): Promise<void> => {
  await apiClient.patch("/users/me", {
    nick_name: profileInfo.nickName,
  });
};

const handleRegisterProfile = async (
  profileInfo: RegisterProfileDto,
): Promise<void> => {
  await apiClient.post("/users/me/registration", {
    nick_name: profileInfo.nickName,
    group_id: profileInfo.groupId,
  });
};

export { handleRegisterProfile, handleUpdateProfile };
