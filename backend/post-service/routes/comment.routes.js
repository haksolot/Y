const express = require("express");
const router = express.Router();
const commentariesController = require("../controllers/commentaries.controller");

router.get("/", commentariesController.getAllCommentaries);
router.post("/createComment", commentariesController.createComment);
router.get("/getCommentById", commentariesController.getCommentById);
module.exports = router;
