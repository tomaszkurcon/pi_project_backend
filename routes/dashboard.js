const express = require('express');
const dashboardControler = require("../controllers/dashboard")
const router = express.Router();

router.get('/test', (req,res)=> {res.send({test:1})})
router.post('/addAttempt', dashboardControler.postAddAttempt)

module.exports = router