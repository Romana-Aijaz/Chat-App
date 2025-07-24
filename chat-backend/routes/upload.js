// routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { handleFileUpload } = require('../controllers/uploadController');

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), handleFileUpload);

module.exports = router;

