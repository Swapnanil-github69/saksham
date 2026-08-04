const mongoose = require('mongoose');
const { NOTIFICATION_TYPES } = require('../constants/notification.constants');
const generateAlphanumericId = require('../utils/idGenerator');

const NotificationSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => generateAlphanumericId(),
    },
    userId: {
      type: String,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(NOTIFICATION_TYPES),
      default: NOTIFICATION_TYPES.SYSTEM,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index on userId and isRead for quick retrieval of unread notifications
NotificationSchema.index({ userId: 1, isRead: 1 });
NotificationSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', NotificationSchema);
