const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateObjectId } = require('../validators/application.validator');

router.get('/:id', protect, validateObjectId('id'), userController.getUser);

module.exports = router;
