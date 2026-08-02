const authService = require('../services/auth.service');
const catchAsync = require('../utils/catchAsync');
const { sendSuccess } = require('../utils/response');

const register = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await authService.registerUser({ name, email, password, role });
  return sendSuccess(res, 'User registered successfully', { user }, 201);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const data = await authService.loginUser({ email, password });
  
  const responseUser = {
    id: data.user._id,
    _id: data.user._id,
    name: data.user.name,
    email: data.user.email,
    role: data.user.role,
    isActive: data.user.isActive,
    createdAt: data.user.createdAt,
    updatedAt: data.user.updatedAt
  };

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    token: data.token,
    user: {
      id: data.user._id,
      role: data.user.role
    },
    data: {
      token: data.token,
      user: responseUser
    }
  });
});

const getMe = catchAsync(async (req, res) => {
  // req.user is already populated by auth middleware
  const user = req.user.toJSON();
  return sendSuccess(res, 'Current user profile retrieved', { user }, 200);
});

const logout = catchAsync(async (req, res) => {
  // JWT is stateless, so we client-side discard it. Here we just return success message.
  return sendSuccess(res, 'Logged out successfully', {}, 200);
});

module.exports = {
  register,
  login,
  getMe,
  logout,
};
