const Notification = require('../../models/Notification');
const AppError = require('../../utils/AppError');

const createNotification = async ({ userId, title, message, type }) => {
  return await Notification.create({
    userId,
    title,
    message,
    type,
  });
};

const getNotifications = async (userId) => {
  return await Notification.find({ userId }).sort({ createdAt: -1 });
};

const markAsRead = async (id, userId) => {
  const notification = await Notification.findById(id);
  if (!notification) {
    throw new AppError('Notification not found', 'NOT_FOUND', 404);
  }

  if (notification.userId.toString() !== userId.toString()) {
    throw new AppError('You are not authorized to access this notification', 'FORBIDDEN', 403);
  }

  notification.isRead = true;
  await notification.save();
  return notification;
};

const markAllAsRead = async (userId) => {
  await Notification.updateMany({ userId, isRead: false }, { isRead: true });
  return { success: true };
};

const deleteNotification = async (id, userId) => {
  const notification = await Notification.findById(id);
  if (!notification) {
    throw new AppError('Notification not found', 'NOT_FOUND', 404);
  }

  if (notification.userId.toString() !== userId.toString()) {
    throw new AppError('You are not authorized to delete this notification', 'FORBIDDEN', 403);
  }

  await Notification.findByIdAndDelete(id);
  return notification;
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
