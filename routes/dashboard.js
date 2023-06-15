const express = require('express');
const dashboardControler = require("../controllers/dashboard")
const requireAuth = require("../middlewares/requireAuth")

const router = express.Router();
router.use(requireAuth)
router.get('/getAttempts', dashboardControler.getAttempts)
router.post('/addAttempt', dashboardControler.postAddAttempt)

module.exports = router