const express = require('express');
const { getUsers, createUser, createUserByAdmin } = require('../controller/UserController.js')
const { AuthenticationApps } = require('../middleware/AuthMiddleware.js');
const router = express.Router()

// Endpoint API
router.get('/', getUsers);
router.post('/', createUser);
router.post('/admin-create', AuthenticationApps('admin'), createUserByAdmin);


module.exports = router;