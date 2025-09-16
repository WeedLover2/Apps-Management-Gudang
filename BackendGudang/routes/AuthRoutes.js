// routes/AuthRoutes.js
const express = require('express');
const router = express.Router();
const { signIn } = require('../controller/AuthController');
const { checkRole } = require('../middleware/AuthMiddleware');



/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Login user to get a token
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: admin
 *                 required: true
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful, token returned.
 *       401:
 *         description: Unauthorized, invalid credentials.
 */

// Route Login
router.post('/signin', signIn);

module.exports = router;