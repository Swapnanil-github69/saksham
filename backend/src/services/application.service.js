const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const ROLES = require('../constants/roles');
const { APPLICATION_STATUS } = require('../constants/application.constants');
const notificationService = require('./notification.service');

const applyToJob = async ({ jobId, applicantId, resumeUrl, coverLetter }) => {
  // 1. Check if job exists
  const job = await Job.findById(jobId);
  if (!job) {
    throw new AppError('Job not found', 'NOT_FOUND', 404);
  }

  // 2. Check if job is open
  if (job.status !== 'OPEN') {
    throw new AppError('This job is closed or in draft status. Cannot apply.', 'BAD_REQUEST', 400);
  }

  // 3. Verify user is a JOB_SEEKER
  const applicant = await User.findById(applicantId);
  if (!applicant || applicant.role !== ROLES.JOB_SEEKER) {
    throw new AppError('Only users with role JOB_SEEKER can apply to jobs.', 'FORBIDDEN', 403);
  }

  // 4. Check if duplicate application
  const existingApp = await Application.findOne({ jobId, applicantId });
  if (existingApp) {
    throw new AppError('You have already applied for this job.', 'CONFLICT', 409);
  }

  // 5. Create application
  const application = await Application.create({
    jobId,
    applicantId,
    resumeUrl,
    coverLetter,
  });

  // 6. Generate Notifications
  // Notify Job Seeker
  await notificationService.createNotification({
    userId: applicantId,
    title: 'Application Submitted',
    message: `You have successfully applied to the position: ${job.title}.`,
    type: 'APPLICATION_SUBMITTED',
  });

  // Notify Employer
  await notificationService.createNotification({
    userId: job.employerId,
    title: 'New Job Application Received',
    message: `${applicant.name} has applied for the job position: ${job.title}.`,
    type: 'NEW_APPLICATION',
  });

  return application;
};

const getMyApplications = async (applicantId) => {
  return await Application.find({ applicantId })
    .populate({
      path: 'jobId',
      select: 'title category employmentType location salaryMin salaryMax companyId',
      populate: {
        path: 'companyId',
        select: 'companyName logo industry',
      },
    })
    .sort({ createdAt: -1 });
};

const getJobApplications = async (jobId, userId, userRole) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new AppError('Job not found', 'NOT_FOUND', 404);
  }

  // Authorize: Employer who posted the job or Admin
  if (userRole !== ROLES.ADMIN && job.employerId.toString() !== userId.toString()) {
    throw new AppError('You are not authorized to view applications for this job.', 'FORBIDDEN', 403);
  }

  return await Application.find({ jobId })
    .populate('applicantId', 'name email')
    .sort({ createdAt: -1 });
};

const getApplicationById = async (id, userId, userRole) => {
  const application = await Application.findById(id)
    .populate({
      path: 'jobId',
      select: 'title employerId category companyId',
      populate: {
        path: 'companyId',
        select: 'companyName',
      },
    })
    .populate('applicantId', 'name email');

  if (!application) {
    throw new AppError('Application not found', 'NOT_FOUND', 404);
  }

  // Access rules:
  // - Applicant can view their own application
  // - Employer who posted the job can view it
  // - Admin can view it
  const isApplicant = application.applicantId._id.toString() === userId.toString();
  const isEmployer = application.jobId.employerId.toString() === userId.toString();

  if (userRole !== ROLES.ADMIN && !isApplicant && !isEmployer) {
    throw new AppError('You are not authorized to view this application.', 'FORBIDDEN', 403);
  }

  return application;
};

const updateApplicationStatus = async (id, status, userId, userRole) => {
  const application = await Application.findById(id).populate('jobId', 'title employerId');
  if (!application) {
    throw new AppError('Application not found', 'NOT_FOUND', 404);
  }

  // Authorization check: Only Admin or the Employer who posted the job can change status
  const isEmployer = application.jobId.employerId.toString() === userId.toString();
  if (userRole !== ROLES.ADMIN && !isEmployer) {
    throw new AppError('You are not authorized to update application status.', 'FORBIDDEN', 403);
  }

  // Validate status transition
  if (application.status === APPLICATION_STATUS.WITHDRAWN) {
    throw new AppError('Cannot update status of a withdrawn application.', 'BAD_REQUEST', 400);
  }

  application.status = status;
  await application.save();

  // Notify applicant of status change
  await notificationService.createNotification({
    userId: application.applicantId,
    title: 'Application Status Updated',
    message: `Your application status for ${application.jobId.title} has been updated to: ${status}.`,
    type: 'STATUS_CHANGED',
  });

  return application;
};

const withdrawApplication = async (id, userId, userRole) => {
  const application = await Application.findById(id).populate('jobId', 'title');
  if (!application) {
    throw new AppError('Application not found', 'NOT_FOUND', 404);
  }

  // Rule: Job seeker can withdraw their own application. Admin can manage/delete it.
  const isApplicant = application.applicantId.toString() === userId.toString();
  if (userRole !== ROLES.ADMIN && !isApplicant) {
    throw new AppError('You are not authorized to withdraw this application.', 'FORBIDDEN', 403);
  }

  // Set status to WITHDRAWN
  application.status = APPLICATION_STATUS.WITHDRAWN;
  await application.save();

  return application;
};

const deleteApplication = async (id, userId, userRole) => {
  const application = await Application.findById(id);
  if (!application) {
    throw new AppError('Application not found', 'NOT_FOUND', 404);
  }

  // Admin can delete, or applicant can delete/withdraw
  const isApplicant = application.applicantId.toString() === userId.toString();
  if (userRole !== ROLES.ADMIN && !isApplicant) {
    throw new AppError('You are not authorized to delete this application.', 'FORBIDDEN', 403);
  }

  await Application.findByIdAndDelete(id);
  return application;
};

module.exports = {
  applyToJob,
  getMyApplications,
  getJobApplications,
  getApplicationById,
  updateApplicationStatus,
  withdrawApplication,
  deleteApplication,
};
