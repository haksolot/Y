import { apiNotif } from "../utils/axios";
export const createNotif = async (notif) => {
  try {
    const res = await apiNotif.post("/createNotif", notif);
    return res.data;
  } catch (error) {
    console.error(
      "Failed to create notif:",
      error.response?.data || error.message
    );
  }
};

export const getNotifByIdReceiver = async (id_profile) => {
  try {
    const res = await apiNotif.get(`/getNotifByIdReceiver/${id_profile}`);
    return res.data;
  } catch (error) {
    console.error(
      "Failed to get notif by id receiver:",
      error.response?.data || error.message
    );
  }
};
