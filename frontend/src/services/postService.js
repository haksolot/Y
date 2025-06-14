import {apiAuth, apiPost} from "../utils/axios";
export const createPost = async (id_profile, content, created_at) => {
  try {
    const res = await apiPost.post("/createPost", {
      id_profile,
      content,
      created_at,
    });
    return res.data;
  } catch (error) {
    console.error(
      "Failed to create post:",
      error.response?.data || error.message
    );
  }
};

export const getUserIdFromCookie = async () => {
  try {
    const response = await apiAuth.post("/auth/authenticate", {
      withCredentials: true,
    });
    console.log("id", response.data.userId);
    return response.data.userId;
  } catch (error) {
    console.error("Failed to fetch user ID:", error);
    return null;
  }
};
