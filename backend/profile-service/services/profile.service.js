const Profile = require("../models/profile.model");

exports.createProfile = async (data) => {
  const profile = new Profile(data);
  return await profile.save();
};

exports.getProfileByUserId = async (userId) => {
  return await Profile.findOne({ userId });
};

exports.updateProfile = async (userId, updates) => {
  return await Profile.findOneAndUpdate(
    { userId },
    { $set: updates },
    { new: true }
  );
};

exports.deleteProfile = async (userId) => {
  const result = await Profile.findOneAndDelete({ userId });
  return result !== null;
};

exports.followProfile = async (userId, targetProfileId) => {
  const userProfile = await Profile.findOne({ userId });
  const targetProfile = await Profile.findById(targetProfileId);

  if (!userProfile || !targetProfile) throw new Error("Profil introuvable");

  if (!userProfile.following.includes(targetProfile._id)) {
    userProfile.following.push(targetProfile._id);
    await userProfile.save();
  }

  if (!targetProfile.followers.includes(userProfile._id)) {
    targetProfile.followers.push(userProfile._id);
    await targetProfile.save();
  }

  return { message: "Profil suivi avec succès" };
};

exports.unfollowProfile = async (userId, targetProfileId) => {
  const userProfile = await Profile.findOne({ userId });
  const targetProfile = await Profile.findById(targetProfileId);

  if (!userProfile || !targetProfile) throw new Error("Profil introuvable");

  userProfile.following = userProfile.following.filter(
    (id) => !id.equals(targetProfile._id)
  );
  targetProfile.followers = targetProfile.followers.filter(
    (id) => !id.equals(userProfile._id)
  );

  await userProfile.save();
  await targetProfile.save();

  return { message: "Désabonné avec succès" };
};

exports.followProfileService = async (profileId, targetProfileId) => {
  const profile = await Profile.findById(profileId);
  const target = await Profile.findById(targetProfileId);

  if (!profile || !target) throw new Error("Profile not found");

  if (!profile.following.includes(targetProfileId)) {
    profile.following.push(targetProfileId);
    await profile.save();
  }

  if (!target.followers.includes(profileId)) {
    target.followers.push(profileId);
    await target.save();
  }

  return profile;
};

exports.unfollowProfileService = async (profileId, targetProfileId) => {
  const profile = await Profile.findById(profileId);
  const target = await Profile.findById(targetProfileId);

  if (!profile || !target) throw new Error("Profile not found");

  profile.following = profile.following.filter(
    (id) => id.toString() !== targetProfileId
  );
  target.followers = target.followers.filter(
    (id) => id.toString() !== profileId
  );

  await profile.save();
  await target.save();

  return profile;
};
