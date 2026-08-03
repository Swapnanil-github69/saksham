const notificationService = require('../../services/notification/notification.service');
const catchAsync = require('../../utils/catchAsync');
const { sendSuccess } = require('../../utils/response');

const getNotifications = catchAsync(async (req, res) => {
  const notifications = await notificationService.getNotifications(req.user._id);
  return sendSuccess(res, 'Notifications retrieved successfully', { notifications }, 200);
});

const readNotification = catchAsync(async (req, res) => {
  const notification = await notificationService.markAsRead(req.params.id, req.user._id);
  return sendSuccess(res, 'Notification marked as read', { notification }, 200);
});

const readAllNotifications = catchAsync(async (req, res) => {
  const result = await notificationService.markAllAsRead(req.user._id);
  return sendSuccess(res, 'All notifications marked as read', result, 200);
});

const deleteNotification = catchAsync(async (req, res) => {
  const notification = await notificationService.deleteNotification(req.params.id, req.user._id);
  return sendSuccess(res, 'Notification deleted successfully', { notification }, 200);
});

module.exports = {
  getNotifications,
  readNotification,
  readAllNotifications,
  deleteNotification,
};
