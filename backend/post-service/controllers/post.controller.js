require("dotenv").config();
// import axios from "axios";

const jwt = require("jsonwebtoken");
const axios = require("axios");

const { Post } = require("../models/post");
const createPost = async (req, res) => {
  const { id_profile, content, created_at, commentaries, likes } = req.body;
  if (!id_profile || !content || !created_at) {
    return res.status(400).json({
      msg: "Missing parameters",
    });
  }
  try {
    const newPost = new Post({
      id_profile,
      content,
      created_at,
      commentaries,
      likes,
    });
    await newPost.save();
    return res.status(201).json({
      msg: "New Post created !",
      newPost,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

const getFollowedPosts = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.ACCESS_JWT_KEY);
  const userId = decoded._id;
  try {
    const response = await axios.get(
      `http://localhost:3200/api/profile/${userId}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
        withCredentials: true,
      }
    );
    let posts = [];
    // console.log("response.data.following", response.data.following.length);
    for (let i = 0 ; i < response.data.following.length; i++) {
      const followingId = response.data.following[i];
      console.log("followingId", followingId);
      const currentPosts = await Post.find({ id_profile: followingId });
      console.log("currentPosts", currentPosts);
      posts = posts.concat(currentPosts);
    }

    console.log("posts", posts);

    const sortedPosts = posts.sort((a, b) => {
      return b.created_at - a.created_at;
    });


    return res.status(200).json(sortedPosts);
    // return res.status(200).json(response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l’appel interne :", error);
    return res.status(500).json({
      msg: error,
    });
  }
  const posts = await Post.find();
  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.query;
    const post = await Post.findById(id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

const addCommentOnPost = async (req, res) => {
  try {
    const { id, id_comment } = req.body;
    const post = await Post.findById(id);
    post.commentaries.push(id_comment);
    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

const addLikeOnPost = async (req, res) => {
  try {
    const { id_post, id_profile } = req.body;
    const post = await Post.findById(id_post);
    post.likes.push(id_profile);
    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

const deleteLikeOnPost = async (req, res) => {
  try {
    const { id_post, id_profile } = req.query;
    const post = await Post.findById(id_post);
    post.likes.remove(id_profile);
    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

const getPostByIdProfile = async (req, res) => {
  try {
    const { id_profile } = req.query;
    const posts = await Post.find({ id_profile });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.query;
    const post = await Post.findByIdAndDelete(id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const post = await Post.findById(postId);
    post.content = content;
    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getFollowedPosts,
  getPostById,
  addCommentOnPost,
  addLikeOnPost,
  deleteLikeOnPost,
  getPostByIdProfile,
  deletePost,
  updatePost,
};
