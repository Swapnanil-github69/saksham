const express = require('express');
const router = express.Router();
const savedJobController = require('../controllers/savedJob.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const ROLES = require('../constants/roles');

router.get('/', protect, authorize(ROLES.JOB_SEEKER), savedJobController.getSavedJobs);

module.exports = router;
