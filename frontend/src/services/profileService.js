import { apiProfile } from "../utils/axios";
import { getUserIdFromCookie } from "./authService";

export const getProfileByUserId = async (id) => {
  const res = await apiProfile.get(`/${id}`);
  return res.data;
};

export const handleSaveProfile = async (name, Bio, avatarFile) => {
  try {
    const userId = await getUserIdFromCookie();
    const res = await apiProfile.put(
      `/${userId}`,
      {
        display_name: name,
        bio: Bio,
        avatar: avatarFile,
      },
      { withCredentials: true }
    );
    console.log("Profile updated succesfully", res.data);
    handleClose();
  } catch (err) {
    console.error("Error while updating profile :", err);
  }
};

export const followProfile = async (id, id_profile) => {
  const res = await apiProfile.post(`/${id}/follow`, {
    targetProfileId: id_profile,
  });
  return res.data;
};

export const unfollowProfile = async (id, id_profile) => {
  const res = await apiProfile.post(`/${id}/unfollow`, {
    targetProfileId: id_profile,
  });
  return res.data;
};

export const getProfileById = async (id) => {
  const res = await apiProfile.get(`/${id}/profile`);
  return res.data;
};

export const createProfile = async (id, profile) => {
  const res = await apiProfile.post(`/${id}`, profile);
  return res.data;
};