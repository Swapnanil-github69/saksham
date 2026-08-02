const mongoose = require('mongoose');
const { EMPLOYMENT_TYPES, EXPERIENCE_LEVELS, JOB_STATUS } = require('../constants/job.constants');

const JobSchema = new mongoose.Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a job description'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
      trim: true,
    },
    employmentType: {
      type: String,
      enum: Object.values(EMPLOYMENT_TYPES),
      required: [true, 'Please provide an employment type'],
    },
    experienceLevel: {
      type: String,
      enum: Object.values(EXPERIENCE_LEVELS),
      required: [true, 'Please provide an experience level'],
    },
    salaryMin: {
      type: Number,
      min: [0, 'Minimum salary cannot be negative'],
    },
    salaryMax: {
      type: Number,
      min: [0, 'Maximum salary cannot be negative'],
    },
    skills: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: [true, 'Please provide a job category'],
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.OPEN,
    },
    deadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast searching and filtering
JobSchema.index({ title: 'text', description: 'text' }); // Text index for keyword search
JobSchema.index({ location: 1 });
JobSchema.index({ skills: 1 });
JobSchema.index({ category: 1 });
JobSchema.index({ employmentType: 1 });
JobSchema.index({ experienceLevel: 1 });
JobSchema.index({ status: 1 });
JobSchema.index({ employerId: 1 });
JobSchema.index({ companyId: 1 });

module.exports = mongoose.model('Job', JobSchema);
