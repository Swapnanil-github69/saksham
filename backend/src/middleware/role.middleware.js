const AppError = require('../utils/AppError');

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('User session not found. Authentication required.', 'UNAUTHORIZED', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `User role ${req.user.role} is not authorized to access this route`,
          'FORBIDDEN',
          403
        )
      );
    }
    next();
  };
};

module.exports = { authorize };
