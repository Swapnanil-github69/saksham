const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateObjectId } = require('../validators/application.validator');

router.use(protect);

router.get('/', notificationController.getNotifications);
router.patch('/read-all', notificationController.readAllNotifications);
router.patch('/:id/read', validateObjectId('id'), notificationController.readNotification);
router.delete('/:id', validateObjectId('id'), notificationController.deleteNotification);

module.exports = router;
