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
