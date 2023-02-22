const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const isAdmin = require('../middleware/passport');
const passport = require('passport');

router.post('/addUser', passport.authenticate('jwt', {session: false}), isAdmin.requireAdmin, userController.addUser);
router.patch('/updateUser/:id',passport.authenticate('jwt', {session: false}), userController.update);
router.get('/getOne/:id', passport.authenticate('jwt', {session: false}),isAdmin.requireAdmin,userController.getOne);
router.get('/getAll',passport.authenticate('jwt', {session: false}),isAdmin.requireAdmin,userController.getAll);
router.delete('/deleteOne/:id',passport.authenticate('jwt', {session: false}),userController.deleteOne);
module.exports = router;