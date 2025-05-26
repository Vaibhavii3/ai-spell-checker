const express = require('express');
const router = express.Router();
const { processText } = require('../controller/aiController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.post('/process', authMiddleware, processText);

module.exports = router;
