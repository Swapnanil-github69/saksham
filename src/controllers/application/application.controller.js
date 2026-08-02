const applicationService = require('../../services/application/application.service');
const catchAsync = require('../../utils/catchAsync');
const { sendSuccess } = require('../../utils/response');
const AppError = require('../../utils/AppError');

const apply = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  const { coverLetter } = req.body;
  let resumeUrl = req.body.resumeUrl;

  // Handle uploaded file
  if (req.file) {
    resumeUrl = req.file.path.replace(/\\/g, '/');
  }

  if (!resumeUrl) {
    throw new AppError('Resume file or URL is required to apply', 'VALIDATION_ERROR', 400);
  }

  const application = await applicationService.applyToJob({
    jobId,
    applicantId: req.user._id,
    resumeUrl,
    coverLetter,
  });

  return sendSuccess(res, 'Applied to job successfully', { application }, 201);
});

const getMyApplications = catchAsync(async (req, res) => {
  const applications = await applicationService.getMyApplications(req.user._id);
  return sendSuccess(res, 'Your applications retrieved successfully', { applications }, 200);
});

const getJobApplications = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  const applications = await applicationService.getJobApplications(jobId, req.user._id, req.user.role);
  return sendSuccess(res, 'Job applications retrieved successfully', { applications }, 200);
});

const getApplication = catchAsync(async (req, res) => {
  const application = await applicationService.getApplicationById(req.params.id, req.user._id, req.user.role);
  return sendSuccess(res, 'Application retrieved successfully', { application }, 200);
});

const updateStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  const application = await applicationService.updateApplicationStatus(req.params.id, status, req.user._id, req.user.role);
  return sendSuccess(res, 'Application status updated successfully', { application }, 200);
});

const withdraw = catchAsync(async (req, res) => {
  const application = await applicationService.withdrawApplication(req.params.id, req.user._id, req.user.role);
  return sendSuccess(res, 'Application withdrawn successfully', { application }, 200);
});

const deleteApplication = catchAsync(async (req, res) => {
  const application = await applicationService.deleteApplication(req.params.id, req.user._id, req.user.role);
  return sendSuccess(res, 'Application deleted successfully', { application }, 200);
});

module.exports = {
  apply,
  getMyApplications,
  getJobApplications,
  getApplication,
  updateStatus,
  withdraw,
  deleteApplication,
};
