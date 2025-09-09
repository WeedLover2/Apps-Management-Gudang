const express = require('express');
const { getUsers, createUser } = require('../controller/UserController.js')

const router = express.Router()

// Endpoint API
router.get('/', getUsers);
router.post('/', createUser);

module.exports = router;