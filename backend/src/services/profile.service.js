const Profile = require('../models/Profile');
const AppError = require('../utils/AppError');

const getProfileByUserId = async (userId) => {
  const profile = await Profile.findOne({ userId }).populate('userId', 'name email role');
  if (!profile) {
    throw new AppError('Profile not found for this user', 'NOT_FOUND', 404);
  }
  return profile;
};

const upsertProfile = async (userId, profileData) => {
  // Try to find profile. If not found, it creates one. If found, it updates.
  let profile = await Profile.findOne({ userId });

  if (!profile) {
    profile = await Profile.create({
      ...profileData,
      userId,
    });
  } else {
    // Update existing profile fields
    profile = await Profile.findOneAndUpdate(
      { userId },
      { $set: profileData },
      { new: true, runValidators: true }
    );
  }

  return await profile.populate('userId', 'name email role');
};

const deleteProfile = async (userId) => {
  const profile = await Profile.findOne({ userId });
  if (!profile) {
    throw new AppError('Profile not found', 'NOT_FOUND', 404);
  }

  await Profile.findOneAndDelete({ userId });
  return profile;
};

module.exports = {
  getProfileByUserId,
  upsertProfile,
  deleteProfile,
};
