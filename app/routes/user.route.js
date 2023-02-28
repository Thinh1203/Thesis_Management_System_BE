const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const user = require('../middleware/passport');
const passport = require('passport');
const {upload} = require('../middleware/upload');

router.post('/addUser', passport.authenticate('jwt', {session: false}), user.requireAdmin, userController.addUser);
router.put('/updateUser/:id',passport.authenticate('jwt', {session: false}), upload.single('avatar') ,userController.update);
router.get('/getOne/:id', passport.authenticate('jwt', {session: false}),user.requireUser,userController.getOne);
router.get('/getAll',passport.authenticate('jwt', {session: false}),user.requireAdmin,userController.getAll);
router.patch('/changePassword/:id',passport.authenticate('jwt', {session: false}),user.requireUser,userController.updatePassword);
router.delete('/deleteOne/:id',passport.authenticate('jwt', {session: false}),user.requireAdmin,userController.deleteOne);
module.exports = router;