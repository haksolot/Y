const verifyToken = require("../middlewares/verifyToken.middleware");
const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

router.get("/", postController.getAllPosts);
router.post("/createPost", verifyToken, postController.createPost);
router.get("/getPostById", postController.getPostById);
router.post("/addCommentOnPost", postController.addCommentOnPost);
module.exports = router;
