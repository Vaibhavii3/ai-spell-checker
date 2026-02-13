const express = require('express');
const router = express.Router();
const { processText } = require('../controllers/aiController.js');

router.post('/process', processText);

module.exports = router;
