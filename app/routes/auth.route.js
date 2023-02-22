const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const passportConfig = require('../middleware/passport');
const passport = require('passport');

router.post('/login',authController.login);
router.get('/test',passport.authenticate('jwt', {session: false}), authController.testLogin)

module.exports = router;