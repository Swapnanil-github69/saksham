const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyName: {
      type: String,
      required: [true, 'Please provide a company name'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Add index on employerId for lookups
CompanySchema.index({ employerId: 1 });

module.exports = mongoose.model('Company', CompanySchema);
