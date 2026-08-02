const AppError = require('../utils/AppError');
const ROLES = require('../constants/roles');

const validateRegister = (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return next(new AppError('Name is required and must be a valid string', 'VALIDATION_ERROR', 400));
  }

  if (!email || typeof email !== 'string' || email.trim() === '') {
    return next(new AppError('Email is required', 'VALIDATION_ERROR', 400));
  }

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.\w{2,3}$/;
  if (!emailRegex.test(email.trim())) {
    return next(new AppError('Please provide a valid email address', 'VALIDATION_ERROR', 400));
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return next(new AppError('Password is required and must be at least 6 characters long', 'VALIDATION_ERROR', 400));
  }

  if (role && !Object.values(ROLES).includes(role)) {
    return next(new AppError(`Invalid role. Allowed roles are: ${Object.values(ROLES).join(', ')}`, 'VALIDATION_ERROR', 400));
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || email.trim() === '') {
    return next(new AppError('Email is required', 'VALIDATION_ERROR', 400));
  }

  if (!password || typeof password !== 'string' || password.trim() === '') {
    return next(new AppError('Password is required', 'VALIDATION_ERROR', 400));
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
