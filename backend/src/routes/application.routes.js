const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateObjectId, validateApplicationStatus } = require('../validators/application.validator');
const ROLES = require('../constants/roles');

router.use(protect);

// GET /api/applications/my (Job Seeker views own applications)
router.get('/my', authorize(ROLES.JOB_SEEKER), applicationController.getMyApplications);

// GET /api/applications/:id (Retrieve single application details)
router.get('/:id', validateObjectId('id'), applicationController.getApplication);

// PATCH /api/applications/:id/status (Employer/Admin updates status)
router.patch(
  '/:id/status',
  authorize(ROLES.EMPLOYER, ROLES.ADMIN),
  validateObjectId('id'),
  validateApplicationStatus,
  applicationController.updateStatus
);

// DELETE /api/applications/:id (Withdraw application or delete application)
router.delete('/:id', validateObjectId('id'), applicationController.deleteApplication);

module.exports = router;
