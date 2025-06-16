const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');

router.post('/', profileController.createProfile);

router.get('/:userId', profileController.getProfileByUserId);

router.put('/:userId', profileController.updateProfile);

router.delete('/:userId', profileController.deleteProfile);

router.post('/:id/follow', profileController.followProfile);

router.post('/:id/unfollow', profileController.unfollowProfile);

module.exports = router;
