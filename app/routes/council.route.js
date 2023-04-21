const express = require('express');
const router = express.Router();
const councilController = require('../controller/council.controller');
const user = require('../middleware/passport');
const passport = require('passport');
const { uploadFile } = require('../middleware/upload');

router.post('/createCouncil',passport.authenticate('jwt', {session: false}),user.requireAdmin , councilController.createCouncil);
router.patch('/updateCouncil/:id',passport.authenticate('jwt', {session: false}),user.requireAdmin , councilController.updateCouncil);
router.get('/getOne/:id' , councilController.getOne);
router.get('/getAll',councilController.getAll);
router.get('/getListCouncil',passport.authenticate('jwt', {session: false}),user.requireAdmin ,councilController.getListCouncil);
router.delete('/deleteOne/:id',passport.authenticate('jwt', {session: false}),user.requireAdmin ,councilController.deleteOne);
router.get('/getAllSemester',passport.authenticate('jwt', {session: false}), user.requireAdmin,councilController.getAllSemester);
router.get('/getAllTeacher',passport.authenticate('jwt', {session: false}), user.requireAdmin,councilController.getAllTeacher);
router.patch('/councilStatus/:id',passport.authenticate('jwt', {session: false}),user.requireAdmin , councilController.councilStatus);
router.get('/getOneUpdate/:id',passport.authenticate('jwt', {session: false}),user.requireAdmin , councilController.getOneUpdate);

module.exports = router;