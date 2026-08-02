class AppError extends Error {
  constructor(message, errorCode = 'INTERNAL_SERVER_ERROR', statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
