const profileService = require('../../services/profile/profile.service');
const catchAsync = require('../../utils/catchAsync');
const { sendSuccess } = require('../../utils/response');

const parseIfString = (val) => {
  if (typeof val === 'string') {
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }
  return val;
};

const getProfile = catchAsync(async (req, res) => {
  const profile = await profileService.getProfileByUserId(req.user._id);
  return sendSuccess(res, 'Profile retrieved successfully', { profile }, 200);
});

const createProfile = catchAsync(async (req, res) => {
  const profileData = { ...req.body };

  // Parse arrays if they are sent as JSON strings (common in multipart forms)
  if (profileData.skills) profileData.skills = parseIfString(profileData.skills);
  if (profileData.education) profileData.education = parseIfString(profileData.education);
  if (profileData.experience) profileData.experience = parseIfString(profileData.experience);

  // Handle uploaded files
  if (req.files) {
    if (req.files.profileImage && req.files.profileImage[0]) {
      profileData.profileImage = req.files.profileImage[0].path.replace(/\\/g, '/');
    }
    if (req.files.resume && req.files.resume[0]) {
      profileData.resumeUrl = req.files.resume[0].path.replace(/\\/g, '/');
    }
  }

  const profile = await profileService.upsertProfile(req.user._id, profileData);
  return sendSuccess(res, 'Profile created successfully', { profile }, 201);
});

const updateProfile = catchAsync(async (req, res) => {
  const profileData = { ...req.body };

  // Parse arrays if they are sent as JSON strings
  if (profileData.skills) profileData.skills = parseIfString(profileData.skills);
  if (profileData.education) profileData.education = parseIfString(profileData.education);
  if (profileData.experience) profileData.experience = parseIfString(profileData.experience);

  // Handle uploaded files
  if (req.files) {
    if (req.files.profileImage && req.files.profileImage[0]) {
      profileData.profileImage = req.files.profileImage[0].path.replace(/\\/g, '/');
    }
    if (req.files.resume && req.files.resume[0]) {
      profileData.resumeUrl = req.files.resume[0].path.replace(/\\/g, '/');
    }
  }

  const profile = await profileService.upsertProfile(req.user._id, profileData);
  return sendSuccess(res, 'Profile updated successfully', { profile }, 200);
});

const deleteProfile = catchAsync(async (req, res) => {
  const profile = await profileService.deleteProfile(req.user._id);
  return sendSuccess(res, 'Profile deleted successfully', { profile }, 200);
});

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};
