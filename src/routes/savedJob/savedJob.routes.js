const express = require('express');
const router = express.Router();
const savedJobController = require('../../controllers/savedJob/savedJob.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { authorize } = require('../../middleware/role.middleware');
const ROLES = require('../../constants/roles');

router.get('/', authMiddleware, authorize(ROLES.JOB_SEEKER), savedJobController.getSavedJobs);

module.exports = router;
