const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/user.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { validateObjectId } = require('../../validators/application/application.validator');

router.get('/:id', authMiddleware, validateObjectId('id'), userController.getUser);

module.exports = router;
