const express = require('express')
const router = express.Router()
const filesControler = require('../controllers/files')
router.post("/upload", filesControler.postUploadFile);

module.exports = router;