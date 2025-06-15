import {apiAuth, apiPost} from "../utils/axios";
export const createPost = async (post) => {
  try {
    const res = await apiPost.post("/createPost", post);
    return res.data;
  } catch (error) {
    console.error(
      "Failed to create post:",
      error.response?.data || error.message
    );
  }
};

export const getAllPosts = async () => {
  try {
    const res = await apiPost.get("/");
    return res.data;
  } catch (error) {
    console.error(
      "Failed to get all posts:",
      error.response?.data || error.message
    );
  }
};

export const getUserIdFromCookie = async () => {
  try {
    const response = await apiAuth.post("/authenticate", {}, {
      withCredentials: true,
    });
    return response.data.userId;
  } catch (error) {
    console.error("Failed to fetch user ID:", error);
    return null;
  }
};
