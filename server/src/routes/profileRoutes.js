const express = require('express');
const router = express.Router();
const authenticateToken = require('../config/authMiddleware');
const profile = require('../controllers/profileControllers');

router.get('/', authenticateToken, profile);


module.exports = router;