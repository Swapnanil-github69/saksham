const User = require('../models/User');
const AppError = require('../utils/AppError');
const { signToken } = require('../utils/jwt');

const registerUser = async ({ name, email, password, role }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('A user with this email address already exists', 'CONFLICT', 409);
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // Get safe user object (convert to JSON and delete password)
  const safeUser = user.toJSON();
  delete safeUser.password;

  return safeUser;
};

const loginUser = async ({ email, password }) => {
  // Find user and explicitly select password
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Invalid email or password', 'UNAUTHORIZED', 401);
  }

  if (!user.isActive) {
    throw new AppError('This user account has been deactivated', 'FORBIDDEN', 403);
  }

  // Compare passwords
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 'UNAUTHORIZED', 401);
  }

  // Generate JWT token
  const token = signToken({ userId: user._id, role: user.role });

  // Get safe user object
  const safeUser = user.toJSON();
  delete safeUser.password;

  return {
    token,
    user: safeUser,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
