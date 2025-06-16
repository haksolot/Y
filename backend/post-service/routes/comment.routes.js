const express = require("express");
const router = express.Router();
const commentariesController = require("../controllers/commentaries.controller");
const verifyToken = require("../middlewares/verifyToken.middleware");

router.get("/", commentariesController.getAllCommentaries);
router.post(
  "/createComment",
  verifyToken,
  commentariesController.createComment
);
router.get("/getCommentById", commentariesController.getCommentById);
router.post(
  "/replyToComment",
  verifyToken,
  commentariesController.replyToComment
);

module.exports = router;
  