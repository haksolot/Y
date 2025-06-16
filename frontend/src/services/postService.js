import { apiAuth, apiPost, apiComment } from "../utils/axios";
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

export const createComment = async (post) => {
  try {
    const res = await apiComment.post("/createComment", post);
    return res.data;
  } catch (error) {
    console.error(
      "Failed to create comment:",
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
    const response = await apiAuth.post(
      "/authenticate",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data.userId;
  } catch (error) {
    console.error("Failed to fetch user ID:", error);
    return null;
  }
};

export const addCommentOnPost = async (id, id_comment) => {
  try {
    const res = await apiPost.post("/addCommentOnPost", { id, id_comment });
    return res.data;
  } catch (error) {
    console.error(
      "Failed to add comment on post:",
      error.response?.data || error.message
    );
  }
};


export const addLikeOnPost = async (id_post, id_profile) => {
  try {
    const res = await apiPost.post("/addLikeOnPost", { id_post, id_profile });
    return res.data;
  } catch (error) {
    console.error(
      "Failed to add like on post:",
      error.response?.data || error.message
    );
  }
};

export const deleteLikeOnPost = async (id_post, id_profile) => {
  try {
    const res = await apiPost.delete("/deleteLikeOnPost", {params: { id_post, id_profile }});
    return res.data;
  } catch (error) {
    console.error(
      "Failed to delete like on post:",
      error.response?.data || error.message
    );
  }
};

export const getPostById = async (id) => {
  const res = await apiPost.get("/getPostById", {
    params: { id },
  });
  return res.data;
};

export const getCommentById = async (id) => {
  const res = await apiComment.get("/getCommentById", {
    params: { id },
  });
  return res.data;
};
