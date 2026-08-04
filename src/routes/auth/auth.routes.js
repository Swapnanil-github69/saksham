const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/auth.controller');
const { validateRegister, validateLogin } = require('../../validators/auth/auth.validator');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.get('/me', authMiddleware, authController.getMe);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;
