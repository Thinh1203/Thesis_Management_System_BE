const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const passportConfig = require('../middleware/passport');
const passport = require('passport');

router.post('/login',authController.login);

module.exports = router;