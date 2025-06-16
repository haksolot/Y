require("dotenv").config();
const { Commentaries } = require("../models/post")
const createComment = async (req, res) => {
  const { id_profile, content, created_at } = req.body;
  if (!id_profile || !content || !created_at) {
    return res.status(400).json({
      msg: "Missing parameters",
    });
  }
  try {
    const newComment = new Commentaries({
      id_profile,
      content,
      created_at,
    });
    await newComment.save();
    return res.status(201).json({
      msg: "New Comment created !",
      newComment
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getAllCommentaries = async (req, res) => {
  try {
    const commentaries = await Commentaries.find();
    return res.status(200).json(commentaries);
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

const getCommentById = async (req, res) => {
  try {
    const { id } = req.query;
    const comment = await Commentaries.findById(id);
    return res.status(200).json(comment);
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

module.exports = {
  createComment,
  getAllCommentaries,
  getCommentById
};
