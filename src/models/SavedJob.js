const mongoose = require('mongoose');
const generateAlphanumericId = require('../utils/idGenerator');

const SavedJobSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => generateAlphanumericId(),
  },
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  jobId: {
    type: String,
    ref: 'Job',
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

// Enforce that a user can save a specific job only once
SavedJobSchema.index({ userId: 1, jobId: 1 }, { unique: true });
SavedJobSchema.index({ userId: 1 });

module.exports = mongoose.model('SavedJob', SavedJobSchema);
