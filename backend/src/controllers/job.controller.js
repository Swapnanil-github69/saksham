const jobService = require('../services/job.service');
const catchAsync = require('../utils/catchAsync');
const { sendSuccess } = require('../utils/response');

const createJob = catchAsync(async (req, res) => {
  const job = await jobService.createJob(req.body, req.user._id);
  return sendSuccess(res, 'Job created successfully', { job }, 201);
});

const getJobs = catchAsync(async (req, res) => {
  // Pass query filters to job service
  const result = await jobService.queryJobs(req.query);

  // Return consistent structure containing both data and pagination
  return res.status(200).json({
    success: true,
    message: 'Jobs retrieved successfully',
    data: result.data,
    pagination: result.pagination,
  });
});

const getJob = catchAsync(async (req, res) => {
  const job = await jobService.getJobById(req.params.id);
  return sendSuccess(res, 'Job retrieved successfully', { job }, 200);
});

const updateJob = catchAsync(async (req, res) => {
  const job = await jobService.updateJob(req.params.id, req.body, req.user._id, req.user.role);
  return sendSuccess(res, 'Job updated successfully', { job }, 200);
});

const deleteJob = catchAsync(async (req, res) => {
  const job = await jobService.deleteJob(req.params.id, req.user._id, req.user.role);
  return sendSuccess(res, 'Job deleted successfully', { job }, 200);
});

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
};
