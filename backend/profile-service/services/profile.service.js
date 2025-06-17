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

exports.followProfileService = async (userId, targetProfileId) => {
  const profile = await Profile.findOne({ userId: userId });
  const target = await Profile.findById(targetProfileId);

  if (!profile || !target) throw new Error("Profile not found");

  if (!profile.following.includes(targetProfileId)) {
    profile.following.push(targetProfileId);
    await profile.save();
  }

  if (!target.followers.includes(profile._id)) {
    target.followers.push(profile._id);
    await target.save();
  }

  return profile;
};

exports.unfollowProfileService = async (userId, targetProfileId) => {
  const profile = await Profile.findOne({ userId: userId });
  const target = await Profile.findById(targetProfileId);

  if (!profile || !target) throw new Error("Profile not found");

  profile.following = profile.following.filter(
    (id) => id.toString() !== targetProfileId
  );
  target.followers = target.followers.filter(
    (id) => id.toString() !== profile._id.toString()
  );

  await profile.save();
  await target.save();

  return profile;
};
