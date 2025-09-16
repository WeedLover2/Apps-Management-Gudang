const express = require('express');
const { getUsers, createUser, createUserByAdmin } = require('../controller/UserController.js')
const { AuthenticationApps } = require('../middleware/AuthMiddleware.js');
const router = express.Router()

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get list of users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Success get data user
 *       500:
 *         description: Server error
 *   post:
 *     summary: Adding a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: user1
 *                 required: true
 *               roles:
 *                 type: string
 *                 roles: [admin, user]   
 *                 required: true
 *               password:
 *                 type: string
 *                 example: user123
 *                 required: true
 *     responses:
 *       201:
 *         description: Successfully added a new user
 *       500:
 *         description: Server error
 */


// Endpoint API
router.get('/', getUsers);
router.post('/', createUser);
router.post('/admin-create', AuthenticationApps('admin'), createUserByAdmin);

module.exports = router;