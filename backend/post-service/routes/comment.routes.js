const express = require("express");
const router = express.Router();
const commentariesController = require("../controllers/commentaries.controller");

router.get("/", commentariesController.getAllCommentaries);
router.post("/createComment", commentariesController.createComment);

module.exports = router;
