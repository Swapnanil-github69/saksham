const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Not authorized to access this route. Token missing.', 'UNAUTHORIZED', 401));
    }

    try {
      // Verify token
      const decoded = verifyToken(token);

      // Check if user exists and is active
      const user = await User.findById(decoded.userId);
      if (!user) {
        return next(new AppError('The user belonging to this token no longer exists.', 'UNAUTHORIZED', 401));
      }

      if (!user.isActive) {
        return next(new AppError('This user account has been deactivated.', 'FORBIDDEN', 403));
      }

      // Attach decoded payload and user to request
      req.user = user;
      req.user.userId = decoded.userId;
      req.user.role = decoded.role;
      req.userId = decoded.userId; // Additional helper

      next();
    } catch (err) {
      return next(new AppError('Not authorized to access this route. Invalid or expired token.', 'UNAUTHORIZED', 401));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
