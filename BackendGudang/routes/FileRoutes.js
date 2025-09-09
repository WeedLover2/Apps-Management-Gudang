const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../controller/FileController');

// Middleware untuk opload file dengan multer

const upload = multer({ dest: 'uploads/' }); // Folder sementara di server

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;