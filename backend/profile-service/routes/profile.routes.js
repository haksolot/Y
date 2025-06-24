const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");
const verifyToken = require("../middlewares/verifyToken.middleware");
const verifyUser = require("../middlewares/verifyUser.middleware");
const verifyInternalService = require("../middlewares/verifyInternalService.middleware");

router.post("/:userId", profileController.createProfile);

router.get("/:userId", verifyToken, profileController.getProfileByUserId);

router.put("/:userId", verifyUser, profileController.updateProfile);

router.delete("/:userId", profileController.deleteProfile);

router.post("/:userId/follow", verifyUser, profileController.followProfile);

router.post("/:userId/unfollow", verifyUser, profileController.unfollowProfile);

router.get("/:id/profile", profileController.getProfileById);

module.exports = router;
