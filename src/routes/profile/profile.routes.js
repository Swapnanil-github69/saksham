const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/profile/profile.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { authorize } = require('../../middleware/role.middleware');
const { validateProfile } = require('../../validators/profile/profile.validator');
const upload = require('../../middleware/upload.middleware');
const ROLES = require('../../constants/roles');

// All routes require authentication
router.use(authMiddleware);

router.get('/', profileController.getProfile);

// Setup multi-field upload for profileImage and resume
const profileUpload = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
]);

router.post(
  '/',
  authorize(ROLES.JOB_SEEKER),
  profileUpload,
  validateProfile,
  profileController.createProfile
);

router.put(
  '/',
  authorize(ROLES.JOB_SEEKER),
  profileUpload,
  validateProfile,
  profileController.updateProfile
);

router.delete('/', authorize(ROLES.JOB_SEEKER), profileController.deleteProfile);

module.exports = router;
