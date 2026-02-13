// const express = require('express');
// const router = express.Router();
// const { processText } = require('../controllers/aiController.js');

// router.post('/process', processText);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { processText } = require('../controllers/aiController.js');

// Add logging to confirm route is loaded
console.log('✅ aiRoutes loaded');

router.post('/process', (req, res, next) => {
  console.log('🎯 /process route hit!');
  next();
}, processText);

module.exports = router;