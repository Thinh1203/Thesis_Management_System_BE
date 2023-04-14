const express = require('express');
const router = express.Router();
const userController = require('../controller/student.controller');
const user = require('../middleware/passport');
const passport = require('passport');
const { uploadCSV } = require('../middleware/upload');

router.post('/addStudent', passport.authenticate('jwt', {session: false}),user.requireAdmin, userController.addStudent);
router.patch('/updateStudent/:id',passport.authenticate('jwt', {session: false}), user.requireAdmin  ,userController.updateStudent);
router.get('/getOne/:id',userController.getOne);
router.get('/getAll',passport.authenticate('jwt', {session: false}), user.requireAdmin ,userController.getAll);
router.delete('/deleteOne/:id',passport.authenticate('jwt', {session: false}), user.requireAdmin ,userController.deleteStudent);
router.patch('/changePassword',passport.authenticate('jwt', {session: false}), userController.updatePassword);
router.patch('/accountStatus/:id' ,passport.authenticate('jwt', {session: false}),user.requireAdmin,userController.accountStatus);
router.post('/uploadFile',passport.authenticate('jwt', {session: false}) , user.requireAdmin, uploadCSV.single('csv'), userController.uploadFile);
router.get('/search',passport.authenticate('jwt', {session: false}), user.requireAdmin , userController.search);
router.get('/getTotalStudent', passport.authenticate('jwt', {session: false}), user.requireAdmin , userController.getTotalStudent);

module.exports = router;
