const sendSuccess = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (res, message, errorCode = 'INTERNAL_SERVER_ERROR', statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: errorCode,
  });
};

module.exports = {
  sendSuccess,
  sendError,
};
