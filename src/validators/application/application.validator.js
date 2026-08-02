const AppError = require('../../utils/AppError');
const mongoose = require('mongoose');
const { APPLICATION_STATUS } = require('../../constants/application.constants');

const validateApplicationStatus = (req, res, next) => {
  const { status } = req.body;
  if (!status) {
    return next(new AppError('Status is required', 'VALIDATION_ERROR', 400));
  }
  if (!Object.values(APPLICATION_STATUS).includes(status)) {
    return next(
      new AppError(
        `Invalid status. Allowed values are: ${Object.values(APPLICATION_STATUS).join(', ')}`,
        'VALIDATION_ERROR',
        400
      )
    );
  }
  next();
};

const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError(`Invalid ${paramName} format`, 'VALIDATION_ERROR', 400));
    }
    next();
  };
};

module.exports = {
  validateApplicationStatus,
  validateObjectId,
};
