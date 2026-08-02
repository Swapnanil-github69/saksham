const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateObjectId } = require('../validators/application.validator');
const ROLES = require('../constants/roles');

router.use(protect);
router.use(authorize(ROLES.ADMIN));

// User management
router.get('/users', adminController.getUsers);
router.patch('/users/:id/status', validateObjectId('id'), adminController.updateUserStatus);
router.delete('/users/:id', validateObjectId('id'), adminController.deleteUser);

// Job management
router.get('/jobs', adminController.getJobs);
router.delete('/jobs/:id', validateObjectId('id'), adminController.deleteJob);

// Application management
router.get('/applications', adminController.getApplications);

module.exports = router;
