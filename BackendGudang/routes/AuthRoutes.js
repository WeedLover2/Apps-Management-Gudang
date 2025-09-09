// routes/AuthRoutes.js
const express = require('express');
const router = express.Router();
const { signIn } = require('../controller/AuthController');

// Route Login
router.post('/signin', signIn);

module.exports = router;