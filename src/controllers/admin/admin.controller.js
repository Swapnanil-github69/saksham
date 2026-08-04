const userService = require('../../services/user/user.service');
const jobService = require('../../services/job/job.service');
const Application = require('../../models/Application');
const catchAsync = require('../../utils/catchAsync');
const { sendSuccess } = require('../../utils/response');

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  return sendSuccess(res, 'All users retrieved', { users }, 200);
});

const updateUserStatus = catchAsync(async (req, res) => {
  const { isActive } = req.body;
  const user = await userService.updateUserStatus(req.params.id, isActive);
  return sendSuccess(res, 'User status updated successfully', { user }, 200);
});

const deleteUser = catchAsync(async (req, res) => {
  const user = await userService.deleteUser(req.params.id, req.user._id);
  return sendSuccess(res, 'User deleted successfully', { user }, 200);
});

const getJobs = catchAsync(async (req, res) => {
  // Query all jobs without OPEN restriction for admin
  const result = await jobService.queryJobs({ status: null, page: 1, limit: 1000 });
  return sendSuccess(res, 'All jobs retrieved', { jobs: result.data }, 200);
});

const deleteJob = catchAsync(async (req, res) => {
  const job = await jobService.deleteJob(req.params.id, req.user._id, req.user.role);
  return sendSuccess(res, 'Job deleted successfully', { job }, 200);
});

const getApplications = catchAsync(async (req, res) => {
  const applications = await Application.find()
    .populate('applicantId', 'name email')
    .populate({
      path: 'jobId',
      select: 'title category location companyId',
      populate: {
        path: 'companyId',
        select: 'companyName logo',
      },
    })
    .sort({ createdAt: -1 });

  return sendSuccess(res, 'All applications retrieved', { applications }, 200);
});

module.exports = {
  getUsers,
  updateUserStatus,
  deleteUser,
  getJobs,
  deleteJob,
  getApplications,
};
