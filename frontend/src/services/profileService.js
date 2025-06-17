import { apiProfile } from "../utils/axios";

export const getProfileByUserId = async (id) => {
  const res = await apiProfile.get(`/${id}`);
  return res.data;
};
