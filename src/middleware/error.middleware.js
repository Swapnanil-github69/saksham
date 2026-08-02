const AppError = require('../utils/AppError');
const { sendError } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Details:', err);
  }

  // Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new AppError(message, 'INVALID_ID', 400);
  }

  // Mongoose Duplicate Key Error (Code 11000)
  if (err.code === 11000) {
    const fields = Object.keys(err.keyValue).join(', ');
    const message = `Duplicate value entered for field(s): ${fields}. Please use another value.`;
    error = new AppError(message, 'CONFLICT', 409);
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new AppError(message, 'VALIDATION_ERROR', 400);
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    error = new AppError('Invalid token. Please log in again.', 'UNAUTHORIZED', 401);
  }

  if (err.name === 'TokenExpiredError') {
    error = new AppError('Your token has expired. Please log in again.', 'TOKEN_EXPIRED', 401);
  }

  // Fallback values
  const statusCode = error.statusCode || 500;
  const errorCode = error.errorCode || 'INTERNAL_SERVER_ERROR';
  const message = error.message || 'An unexpected server error occurred';

  // In production, we do not expose details of internal server errors
  const clientMessage = (process.env.NODE_ENV === 'production' && statusCode === 500)
    ? 'A server error occurred. Please contact support.'
    : message;

  return sendError(res, clientMessage, errorCode, statusCode);
};

module.exports = errorHandler;
