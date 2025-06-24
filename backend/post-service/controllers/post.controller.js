require("dotenv").config();
// import axios from "axios";

const jwt = require("jsonwebtoken");
const axios = require("axios");

const { Post } = require("../models/post");
const createPost = async (req, res) => {
  const { id_profile, content, created_at, commentaries, likes, image } =
    req.body;
  if (!id_profile || !content || !created_at) {
    return res.status(400).json({
      msg: "Missing parameters",
    });
  }
  try {
    const newPost = new Post({
      image,
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

const repost = async (req, res) => {
  try {
    const { originalPost, new_id_profile } = req.body;

    const post = await Post.findById(originalPost);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const newPost = new Post({
      image: post.image,
      id_profile: new_id_profile,
      content: post.content,
      commentaries: post.commentaries,
      likes: [],
      created_at: new Date(),
      isRepost: true,
      originalPostId: originalPost,
    });

    await newPost.save();
    return res.status(200).json(newPost);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  addCommentOnPost,
  addLikeOnPost,
  deleteLikeOnPost,
  getPostByIdProfile,
  deletePost,
  updatePost,
  repost,
};
