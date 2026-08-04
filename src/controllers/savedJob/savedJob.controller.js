const savedJobService = require('../../services/savedJob/savedJob.service');
const catchAsync = require('../../utils/catchAsync');
const { sendSuccess } = require('../../utils/response');

const saveJob = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  const savedJob = await savedJobService.saveJob(req.user._id, jobId);
  return sendSuccess(res, 'Job saved successfully', { savedJob }, 201);
});

const unsaveJob = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  const savedJob = await savedJobService.unsaveJob(req.user._id, jobId);
  return sendSuccess(res, 'Job unsaved successfully', { savedJob }, 200);
});

const getSavedJobs = catchAsync(async (req, res) => {
  const savedJobs = await savedJobService.getSavedJobs(req.user._id);
  return sendSuccess(res, 'Saved jobs retrieved successfully', { savedJobs }, 200);
});

module.exports = {
  saveJob,
  unsaveJob,
  getSavedJobs,
};
