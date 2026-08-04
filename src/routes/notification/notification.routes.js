const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/notification/notification.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { validateObjectId } = require('../../validators/application/application.validator');

router.use(authMiddleware);

router.get('/', notificationController.getNotifications);
router.patch('/read-all', notificationController.readAllNotifications);
router.patch('/:id/read', validateObjectId('id'), notificationController.readNotification);
router.delete('/:id', validateObjectId('id'), notificationController.deleteNotification);

module.exports = router;
