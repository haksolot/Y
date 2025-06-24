require("dotenv").config();
const { Commentaries } = require("../models/post");

const createCommentObject = async (id_profile, content, created_at) => {
  const newComment = new Commentaries({
    id_profile,
    content,
    created_at,
  });
  await newComment.save();
  return newComment;
};

const createComment = async (req, res) => {
  const { id_profile, content, created_at } = req.body;
  if (!id_profile || !content || !created_at) {
    return res.status(400).json({ msg: "Missing parameters" });
  }
  try {
    const newComment = await createCommentObject(
      id_profile,
      content,
      created_at
    );
    return res.status(201).json({
      msg: "New Comment created !",
      newComment,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
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

const replyToComment = async (req, res) => {
  try {
    const { id_profile, id_comment, content_reply, created_at } = req.body;
    if (!id_profile || !id_comment || !content_reply || !created_at) {
      return res.status(400).json({ msg: "Missing parameters" });
    }
    const replyComment = await createCommentObject(
      id_profile,
      content_reply,
      created_at
    );
    const comment = await Commentaries.findById(id_comment);
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    comment.replies.push(replyComment._id);
    await comment.save();
    return res.status(200).json(comment);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteCommentByIdProfile = async (req, res) => {
  try {
    const { id_profile } = req.query;
    const commentaries = await Commentaries.deleteMany({ id_profile });
    return res.status(200).json(commentaries);
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

module.exports = {
  createComment,
  getAllCommentaries,
  getCommentById,
  replyToComment,
  deleteCommentByIdProfile,
};
