const AppError = require('../../utils/AppError');
const mongoose = require('mongoose');
const { EMPLOYMENT_TYPES, EXPERIENCE_LEVELS, JOB_STATUS } = require('../../constants/job.constants');

const validateJob = (req, res, next) => {
  const {
    companyId,
    title,
    description,
    location,
    employmentType,
    experienceLevel,
    salaryMin,
    salaryMax,
    skills,
    category,
    status,
    deadline,
  } = req.body;

  // For POST request, check required fields. For PATCH/PUT, checking required can be context-dependent,
  // but here let's assume this is for job creation/full update.
  if (req.method === 'POST') {
    if (!companyId) {
      return next(new AppError('companyId is required', 'VALIDATION_ERROR', 400));
    }
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return next(new AppError('title is required', 'VALIDATION_ERROR', 400));
    }
    if (!description || typeof description !== 'string' || description.trim() === '') {
      return next(new AppError('description is required', 'VALIDATION_ERROR', 400));
    }
    if (!location || typeof location !== 'string' || location.trim() === '') {
      return next(new AppError('location is required', 'VALIDATION_ERROR', 400));
    }
    if (!employmentType) {
      return next(new AppError('employmentType is required', 'VALIDATION_ERROR', 400));
    }
    if (!experienceLevel) {
      return next(new AppError('experienceLevel is required', 'VALIDATION_ERROR', 400));
    }
    if (!category || typeof category !== 'string' || category.trim() === '') {
      return next(new AppError('category is required', 'VALIDATION_ERROR', 400));
    }
  }

  // Common data checks if provided
  if (companyId && !/^[A-Z0-9]{12}$/.test(companyId)) {
    return next(new AppError('Invalid companyId format', 'VALIDATION_ERROR', 400));
  }

  if (employmentType && !Object.values(EMPLOYMENT_TYPES).includes(employmentType)) {
    return next(
      new AppError(
        `Invalid employmentType. Allowed values: ${Object.values(EMPLOYMENT_TYPES).join(', ')}`,
        'VALIDATION_ERROR',
        400
      )
    );
  }

  if (experienceLevel && !Object.values(EXPERIENCE_LEVELS).includes(experienceLevel)) {
    return next(
      new AppError(
        `Invalid experienceLevel. Allowed values: ${Object.values(EXPERIENCE_LEVELS).join(', ')}`,
        'VALIDATION_ERROR',
        400
      )
    );
  }

  if (status && !Object.values(JOB_STATUS).includes(status)) {
    return next(
      new AppError(
        `Invalid job status. Allowed values: ${Object.values(JOB_STATUS).join(', ')}`,
        'VALIDATION_ERROR',
        400
      )
    );
  }

  if (salaryMin !== undefined && salaryMin !== null) {
    const min = Number(salaryMin);
    if (isNaN(min) || min < 0) {
      return next(new AppError('salaryMin must be a non-negative number', 'VALIDATION_ERROR', 400));
    }
  }

  if (salaryMax !== undefined && salaryMax !== null) {
    const max = Number(salaryMax);
    if (isNaN(max) || max < 0) {
      return next(new AppError('salaryMax must be a non-negative number', 'VALIDATION_ERROR', 400));
    }
  }

  if (salaryMin !== undefined && salaryMax !== undefined && salaryMin !== null && salaryMax !== null) {
    if (Number(salaryMin) > Number(salaryMax)) {
      return next(new AppError('salaryMin cannot be greater than salaryMax', 'VALIDATION_ERROR', 400));
    }
  }

  if (skills && !Array.isArray(skills)) {
    return next(new AppError('skills must be an array of strings', 'VALIDATION_ERROR', 400));
  }

  if (deadline) {
    const deadDate = new Date(deadline);
    if (isNaN(deadDate.getTime())) {
      return next(new AppError('Invalid deadline date format', 'VALIDATION_ERROR', 400));
    }
  }

  next();
};

const validateJobId = (req, res, next) => {
  const jobId = req.params.jobId || req.params.id;
  if (!jobId || !/^[A-Z0-9]{12}$/.test(jobId)) {
    return next(new AppError('Invalid job ID format', 'VALIDATION_ERROR', 400));
  }
  next();
};

module.exports = {
  validateJob,
  validateJobId,
};
