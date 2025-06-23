const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  id_profile: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  commentaries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commentaries",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],
  isRepost: {
    type: Boolean,
    default: false,
  },
  originalPostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

const CommentSchema = new mongoose.Schema({
  id_profile: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commentaries",
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);
const Commentaries = mongoose.model("Commentaries", CommentSchema);

module.exports = { Post, Commentaries };
