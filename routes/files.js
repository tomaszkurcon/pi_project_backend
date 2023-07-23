const express = require('express')
const router = express.Router()
const filesControler = require('../controllers/files');
const requireAuth = require('../middlewares/requireAuth');
router.use(requireAuth)
router.put("/upload", filesControler.putUploadFile);
router.get("/getFile", filesControler.getFile);
module.exports = router;