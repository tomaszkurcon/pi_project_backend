const express = require('express')
const authController = require('../controllers/auth');
const router = express.Router()

router.post("/register", authController.postRegister);
router.post("/login", authController.postLogin)
router.post("/refresh_token", authController.postNewRefreshToken)

router.post("/forgot_password", authController.postForgotPassowrd)
router.put("/reset_password", authController.putResetPassword)
module.exports = router;