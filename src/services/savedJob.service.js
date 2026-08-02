const SavedJob = require('../models/SavedJob');
const Job = require('../models/Job');
const AppError = require('../utils/AppError');

const saveJob = async (userId, jobId) => {
  // Check if job exists
  const job = await Job.findById(jobId);
  if (!job) {
    throw new AppError('Job not found', 'NOT_FOUND', 404);
  }

  // Check if already saved
  const existingSaved = await SavedJob.findOne({ userId, jobId });
  if (existingSaved) {
    throw new AppError('You have already saved this job', 'CONFLICT', 409);
  }

  const savedJob = await SavedJob.create({
    userId,
    jobId,
  });

  return savedJob;
};

const unsaveJob = async (userId, jobId) => {
  const savedJob = await SavedJob.findOne({ userId, jobId });
  if (!savedJob) {
    throw new AppError('Saved job record not found', 'NOT_FOUND', 404);
  }

  await SavedJob.findOneAndDelete({ userId, jobId });
  return savedJob;
};

const getSavedJobs = async (userId) => {
  return await SavedJob.find({ userId })
    .populate({
      path: 'jobId',
      populate: {
        path: 'companyId',
        select: 'companyName website logo industry location',
      },
    })
    .sort({ savedAt: -1 });
};

module.exports = {
  saveJob,
  unsaveJob,
  getSavedJobs,
};
