const express = require('express');
const router = express.Router();
const userController = require('../controller/teacher.controller');
const user = require('../middleware/passport');
const passport = require('passport');
const { uploadCSV } = require('../middleware/upload');

router.post('/addTeacher',passport.authenticate('jwt', {session: false}) , user.requireAdmin, userController.addTeacher);
router.post('/uploadFile',passport.authenticate('jwt', {session: false}) , user.requireAdmin, uploadCSV.single('csv'), userController.uploadFile);
router.patch('/updateTeacher/:id' ,passport.authenticate('jwt', {session: false}),user.requireAdmin,userController.updateTeacher);
router.patch('/accountStatus/:id' ,passport.authenticate('jwt', {session: false}),user.requireAdmin,userController.accountStatus);
router.get('/getOne/:id',passport.authenticate('jwt', {session: false}), userController.getOne);
router.get('/getAll', passport.authenticate('jwt', {session: false}), user.requireAdmin ,userController.getAll);
router.patch('/changePassword/:id',passport.authenticate('jwt', {session: false}) , userController.updatePassword);
router.get('/search',passport.authenticate('jwt', {session: false}), user.requireAdmin , userController.search);
router.delete('/deleteOne/:id', passport.authenticate('jwt', {session: false}), user.requireAdmin , userController.deleteTeacher);
router.get('/getTotalTeacher', passport.authenticate('jwt', {session: false}), user.requireAdmin , userController.getTotalTeacher);
router.get('/getListTeacher',passport.authenticate('jwt', {session: false}), user.requireAdmin ,userController.getListTeacher);
router.get('/getAllCouncil',passport.authenticate('jwt', {session: false}) ,userController.getAllCouncil);
router.get('/getAllTopicTutorial/:id',passport.authenticate('jwt', {session: false}), user.requireAdmin,userController.getAllTopicTutorial);

module.exports = router;
