import { apiAuth, apiPost, apiComment } from "../utils/axios";
import { getUserIdFromCookie } from "./authService";
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

export const getFollowedPosts = async () => {
  try {
    // const userId = await getUserIdFromCookie();
    // const res = await apiPost.get(`/getFollowedPosts/${userId}`);
    const res = await apiPost.get(`/getFollowedPosts`);
    return res.data;
  } catch (error) {
    console.error(
      "Failed to get all posts:",
      error.response?.data || error.message
    );
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
    const res = await apiPost.delete("/deleteLikeOnPost", {
      params: { id_post, id_profile },
    });
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

export const replyToComment = async (
  id_profile,
  id_comment,
  content_reply,
  created_at
) => {
  try {
    const res = await apiComment.post("/replyToComment", {
      id_profile,
      id_comment,
      content_reply,
      created_at,
    });
    return res.data;
  } catch (error) {
    console.error(
      "Failed to reply to comment:",
      error.response?.data || error.message
    );
  }
};

export const getPostByIdProfile = async (id_profile) => {
  const res = await apiPost.get("/getPostByIdProfile", {
    params: { id_profile },
  });
  return res.data;
};


export const deletePost = async (id) => {
  const res = await apiPost.delete("/deletePost", {
    params: { id },
  });
  return res.data;
}
export const editPost = async (postId, content) => {
  try {
    const userId = await getUserIdFromCookie();
    const res = await apiPost.put(
      `/updatePost/${userId}`,
      {
        postId: postId,
        content: content,
      }
    );
    return res.data;
  } catch (error) {
    console.error(
      "Failed to edit post:",
      error.response?.data || error.message
    );
  }

};
