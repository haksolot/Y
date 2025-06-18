import { apiProfile } from "../utils/axios";

export const getProfileByUserId = async (id) => {
  const res = await apiProfile.get(`/${id}`);
  return res.data;
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
