const mongoose = require('mongoose');
const { APPLICATION_STATUS } = require('../constants/application.constants');

const ApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resumeUrl: {
      type: String,
      required: [true, 'Please provide a resume for the application'],
    },
    coverLetter: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(APPLICATION_STATUS),
      default: APPLICATION_STATUS.APPLIED,
    },
  },
  {
    timestamps: true,
  }
);

// Enforce unique application per job per candidate
ApplicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });
ApplicationSchema.index({ applicantId: 1 });
ApplicationSchema.index({ jobId: 1 });

module.exports = mongoose.model('Application', ApplicationSchema);
