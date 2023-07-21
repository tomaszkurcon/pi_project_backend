const express = require('express')
const router = express.Router()
const filesControler = require('../controllers/files');
const requireAuth = require('../middlewares/requireAuth');
router.use(requireAuth)
router.post("/upload", filesControler.postUploadFile);
router.get("/getFile", filesControler.getFile);
module.exports = router;