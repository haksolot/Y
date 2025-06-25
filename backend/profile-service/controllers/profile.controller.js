const profileService = require("../services/profile.service");

exports.createProfile = async (req, res) => {
  try {
    const newProfile = await profileService.createProfile(req.body);
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfileByUserId = async (req, res) => {
  try {
    // console.log("req.params.userId", req.params.userId);
    const profile = await profileService.getProfileByUserId(req.params.userId);
    if (!profile)
      return res.status(404).json({ message: "Profil introuvable" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    // console.log("req.params.userId", req.params.id);
    const profile = await profileService.getProfileById(req.params.id);
    if (!profile)
      return res.status(404).json({ message: "Profil introuvable" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updatedProfile = await profileService.updateProfile(
      req.params.userId,
      req.body
    );
    if (!updatedProfile)
      return res.status(404).json({ message: "Profil introuvable" });
    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const deleted = await profileService.deleteProfile(req.params.userId);
    if (!deleted)
      return res.status(404).json({ message: "Profil introuvable" });
    res.json({ message: "Profil supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.followProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { targetProfileId } = req.body;

    const updatedProfile = await profileService.followProfileService(
      userId,
      targetProfileId
    );
    res.status(200).json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unfollowProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { targetProfileId } = req.body;

    const updatedProfile = await profileService.unfollowProfileService(
      userId,
      targetProfileId
    );
    res.status(200).json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
