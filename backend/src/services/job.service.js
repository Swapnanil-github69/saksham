const Job = require('../models/Job');
const Company = require('../models/Company');
const AppError = require('../utils/AppError');
const ROLES = require('../constants/roles');

const createJob = async (jobData, employerId) => {
  // Validate company existence and employer ownership
  const company = await Company.findById(jobData.companyId);
  if (!company) {
    throw new AppError('Specified company does not exist', 'NOT_FOUND', 404);
  }

  if (company.employerId.toString() !== employerId.toString()) {
    throw new AppError('You are not authorized to create jobs for this company', 'FORBIDDEN', 403);
  }

  const job = await Job.create({
    ...jobData,
    employerId,
  });

  return job;
};

const queryJobs = async (filters = {}) => {
  const {
    keyword,
    location,
    skills,
    category,
    employmentType,
    experienceLevel,
    salaryMin,
    salaryMax,
    status,
    page = 1,
    limit = 10,
  } = filters;

  const query = {};

  // Status filtering - default is OPEN
  if (status) {
    query.status = status;
  } else {
    query.status = 'OPEN';
  }

  // Keyword search (matches in title or description)
  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ];
  }

  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }

  if (category) {
    query.category = { $regex: category, $options: 'i' };
  }

  if (employmentType) {
    query.employmentType = employmentType;
  }

  if (experienceLevel) {
    query.experienceLevel = experienceLevel;
  }

  if (skills) {
    const skillsList = Array.isArray(skills)
      ? skills
      : skills.split(',').map(s => s.trim()).filter(Boolean);
    if (skillsList.length > 0) {
      query.skills = { $in: skillsList };
    }
  }

  // Salary range checks
  if (salaryMin !== undefined && salaryMin !== '') {
    query.salaryMax = { $gte: Number(salaryMin) };
  }

  if (salaryMax !== undefined && salaryMax !== '') {
    if (query.salaryMax) {
      // If min and max both defined, combine
      query.salaryMin = { $lte: Number(salaryMax) };
    } else {
      query.salaryMin = { $lte: Number(salaryMax) };
    }
  }

  // Pagination setup
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, parseInt(limit));
  const skip = (pageNum - 1) * limitNum;

  const total = await Job.countDocuments(query);
  const totalPages = Math.ceil(total / limitNum);

  const jobs = await Job.find(query)
    .populate('companyId', 'companyName website industry logo location')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  return {
    data: jobs,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages,
    },
  };
};

const getJobById = async (id) => {
  const job = await Job.findById(id)
    .populate('companyId', 'companyName website industry logo location')
    .populate('employerId', 'name email');
  if (!job) {
    throw new AppError('Job not found', 'NOT_FOUND', 404);
  }
  return job;
};

const updateJob = async (id, updateData, userId, userRole) => {
  const job = await Job.findById(id);
  if (!job) {
    throw new AppError('Job not found', 'NOT_FOUND', 404);
  }

  // Check authorization: Employer must own the job; Admin can edit anything
  if (userRole !== ROLES.ADMIN && job.employerId.toString() !== userId.toString()) {
    throw new AppError('You are not authorized to update this job', 'FORBIDDEN', 403);
  }

  // If companyId is being updated, verify new company exists and is owned by employer
  if (updateData.companyId && updateData.companyId.toString() !== job.companyId.toString()) {
    const company = await Company.findById(updateData.companyId);
    if (!company) {
      throw new AppError('Specified company does not exist', 'NOT_FOUND', 404);
    }
    if (userRole !== ROLES.ADMIN && company.employerId.toString() !== userId.toString()) {
      throw new AppError('You do not own this company profile', 'FORBIDDEN', 403);
    }
  }

  const updatedJob = await Job.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).populate('companyId', 'companyName website industry logo location');

  return updatedJob;
};

const deleteJob = async (id, userId, userRole) => {
  const job = await Job.findById(id);
  if (!job) {
    throw new AppError('Job not found', 'NOT_FOUND', 404);
  }

  // Check authorization
  if (userRole !== ROLES.ADMIN && job.employerId.toString() !== userId.toString()) {
    throw new AppError('You are not authorized to delete this job', 'FORBIDDEN', 403);
  }

  await Job.findByIdAndDelete(id);
  return job;
};

module.exports = {
  createJob,
  queryJobs,
  getJobById,
  updateJob,
  deleteJob,
};
