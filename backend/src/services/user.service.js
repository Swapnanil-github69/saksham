const User = require('../models/User');
const AppError = require('../utils/AppError');

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError('User not found', 'NOT_FOUND', 404);
  }
  return user;
};

const getAllUsers = async () => {
  return await User.find({}).sort({ createdAt: -1 });
};

const updateUserStatus = async (id, isActive) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError('User not found', 'NOT_FOUND', 404);
  }

  user.isActive = isActive;
  await user.save();
  return user;
};

const deleteUser = async (id, currentUserId) => {
  if (id === currentUserId.toString()) {
    throw new AppError('An administrator cannot delete themselves', 'BAD_REQUEST', 400);
  }

  const user = await User.findById(id);
  if (!user) {
    throw new AppError('User not found', 'NOT_FOUND', 404);
  }

  await User.findByIdAndDelete(id);
  return user;
};

module.exports = {
  getUserById,
  getAllUsers,
  updateUserStatus,
  deleteUser,
};
