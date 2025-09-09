// routes/AuthRoutes.js
const express = require('express');
const router = express.Router();
const { signIn } = require('../controller/AuthController');
const { checkRole } = require('../middleware/AuthMiddleware');

// Route Login
router.post('/signin', signIn);

module.exports = router;