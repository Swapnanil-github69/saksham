const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const applicationController = require('../controllers/application.controller');
const savedJobController = require('../controllers/savedJob.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateJob, validateJobId } = require('../validators/job.validator');
const { validateObjectId } = require('../validators/application.validator');
const upload = require('../middleware/upload.middleware');
const ROLES = require('../constants/roles');

// Public routes
router.get('/', jobController.getJobs);
router.get('/:id', validateJobId, jobController.getJob);

// Protected routes (Employers & Admins)
router.post(
  '/',
  protect,
  authorize(ROLES.EMPLOYER),
  validateJob,
  jobController.createJob
);

router.put(
  '/:id',
  protect,
  authorize(ROLES.EMPLOYER, ROLES.ADMIN),
  validateJobId,
  validateJob,
  jobController.updateJob
);

router.delete(
  '/:id',
  protect,
  authorize(ROLES.EMPLOYER, ROLES.ADMIN),
  validateJobId,
  jobController.deleteJob
);

// Application Sub-routes
// POST /api/jobs/:jobId/apply (Job Seeker applies)
router.post(
  '/:jobId/apply',
  protect,
  authorize(ROLES.JOB_SEEKER),
  validateObjectId('jobId'),
  upload.single('resume'),
  applicationController.apply
);

// GET /api/jobs/:jobId/applications (Employer views job's applications)
router.get(
  '/:jobId/applications',
  protect,
  authorize(ROLES.EMPLOYER, ROLES.ADMIN),
  validateObjectId('jobId'),
  applicationController.getJobApplications
);

// Saved Jobs Sub-routes
// POST /api/jobs/:jobId/save (Job Seeker saves job)
router.post(
  '/:jobId/save',
  protect,
  authorize(ROLES.JOB_SEEKER),
  validateObjectId('jobId'),
  savedJobController.saveJob
);

// DELETE /api/jobs/:jobId/save (Job Seeker removes saved job)
router.delete(
  '/:jobId/save',
  protect,
  authorize(ROLES.JOB_SEEKER),
  validateObjectId('jobId'),
  savedJobController.unsaveJob
);

module.exports = router;
