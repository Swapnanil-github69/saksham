const userService = require('../../services/user/user.service');
const catchAsync = require('../../utils/catchAsync');
const { sendSuccess } = require('../../utils/response');

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  const safeUser = user.toJSON();
  delete safeUser.password;
  return sendSuccess(res, 'User retrieved successfully', { user: safeUser }, 200);
});

module.exports = {
  getUser,
};
