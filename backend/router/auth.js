const express = require('express');
const router = express.Router();
const { signup, login, sendotp, changePassword } = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware')


// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

router.post('/sendotp', sendotp);

router.post('/changePassword', authMiddleware, changePassword)

module.exports = router;