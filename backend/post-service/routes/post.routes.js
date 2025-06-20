const verifyToken = require("../middlewares/verifyToken.middleware");
const verifyUser = require("../middlewares/verifyUser.middleware");
const verifyInternalService = require("../middlewares/verifyInternalService.middleware");
const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

router.get("/", postController.getAllPosts);
router.get("/getFollowedPosts", verifyToken, postController.getFollowedPosts);
router.post("/createPost", verifyToken, postController.createPost);
router.get("/getPostById", postController.getPostById);
router.post("/addCommentOnPost", verifyToken, postController.addCommentOnPost);
router.post("/addLikeOnPost", verifyToken, postController.addLikeOnPost);
router.delete(
  "/deleteLikeOnPost",
  verifyToken,
  postController.deleteLikeOnPost
);
router.get("/getPostByIdProfile", postController.getPostByIdProfile);

router.delete("/deletePost", verifyToken, postController.deletePost);

router.put("/updatePost/:userId", verifyUser, postController.updatePost);

router.post("/repost", verifyToken, postController.repost);

module.exports = router;
