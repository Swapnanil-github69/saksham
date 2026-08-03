const AppError = require('../../utils/AppError');

const validateProfile = (req, res, next) => {
  const { phone, skills, education, experience } = req.body;

  if (skills && !Array.isArray(skills)) {
    return next(new AppError('Skills must be an array of strings', 'VALIDATION_ERROR', 400));
  }

  if (education) {
    if (!Array.isArray(education)) {
      return next(new AppError('Education must be an array', 'VALIDATION_ERROR', 400));
    }
    for (let i = 0; i < education.length; i++) {
      const edu = education[i];
      if (!edu.school || typeof edu.school !== 'string' || edu.school.trim() === '') {
        return next(new AppError(`Education item ${i + 1}: school is required`, 'VALIDATION_ERROR', 400));
      }
      if (!edu.degree || typeof edu.degree !== 'string' || edu.degree.trim() === '') {
        return next(new AppError(`Education item ${i + 1}: degree is required`, 'VALIDATION_ERROR', 400));
      }
      if (!edu.from) {
        return next(new AppError(`Education item ${i + 1}: from date is required`, 'VALIDATION_ERROR', 400));
      }
      const fromDate = new Date(edu.from);
      if (isNaN(fromDate.getTime())) {
        return next(new AppError(`Education item ${i + 1}: invalid from date`, 'VALIDATION_ERROR', 400));
      }
      if (edu.to) {
        const toDate = new Date(edu.to);
        if (isNaN(toDate.getTime())) {
          return next(new AppError(`Education item ${i + 1}: invalid to date`, 'VALIDATION_ERROR', 400));
        }
        if (fromDate > toDate) {
          return next(new AppError(`Education item ${i + 1}: from date cannot be after to date`, 'VALIDATION_ERROR', 400));
        }
      }
    }
  }

  if (experience) {
    if (!Array.isArray(experience)) {
      return next(new AppError('Experience must be an array', 'VALIDATION_ERROR', 400));
    }
    for (let i = 0; i < experience.length; i++) {
      const exp = experience[i];
      if (!exp.title || typeof exp.title !== 'string' || exp.title.trim() === '') {
        return next(new AppError(`Experience item ${i + 1}: title is required`, 'VALIDATION_ERROR', 400));
      }
      if (!exp.company || typeof exp.company !== 'string' || exp.company.trim() === '') {
        return next(new AppError(`Experience item ${i + 1}: company is required`, 'VALIDATION_ERROR', 400));
      }
      if (!exp.from) {
        return next(new AppError(`Experience item ${i + 1}: from date is required`, 'VALIDATION_ERROR', 400));
      }
      const fromDate = new Date(exp.from);
      if (isNaN(fromDate.getTime())) {
        return next(new AppError(`Experience item ${i + 1}: invalid from date`, 'VALIDATION_ERROR', 400));
      }
      if (exp.to) {
        const toDate = new Date(exp.to);
        if (isNaN(toDate.getTime())) {
          return next(new AppError(`Experience item ${i + 1}: invalid to date`, 'VALIDATION_ERROR', 400));
        }
        if (fromDate > toDate) {
          return next(new AppError(`Experience item ${i + 1}: from date cannot be after to date`, 'VALIDATION_ERROR', 400));
        }
      }
    }
  }

  next();
};

module.exports = {
  validateProfile,
};
