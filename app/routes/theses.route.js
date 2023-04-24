const express = require('express');
const router = express.Router();
const thesesController = require('../controller/theses.controller');
const user = require('../middleware/passport');
const passport = require('passport');
const { uploadFile } = require('../middleware/upload');

router.post('/addTheses',passport.authenticate('jwt', {session: false}), user.requireUser, thesesController.addTheses);
router.patch('/updateTheses/:id', thesesController.updateTheses);
router.patch('/uploadFile/:id', uploadFile.single('file'),user.requireUser, thesesController.uploadFile);
router.get('/getOne/:id', thesesController.getOne);
router.get('/getAll' ,thesesController.getAll);
router.get('/getAllListTheses' ,thesesController.getAllListTheses);
router.delete('/deleteTheses/:id',thesesController.deleteTheses);
router.post('/transcript/:id',passport.authenticate('jwt', {session: false}), user.requireUser, thesesController.transcript);
router.get('/ListOfGuidedTopics',passport.authenticate('jwt', {session: false}), user.requireUser, thesesController.ListOfGuidedTopics);
router.get('/search',thesesController.search);
router.get('/downloadFile/:id',thesesController.downLoadFile);
router.get('/fileName/:id',thesesController.fileName);
router.get('/getAllTopicComplete',passport.authenticate('jwt', {session: false}), user.requireUser,thesesController.getAllTopicComplete);
router.get('/listThesesComplete',passport.authenticate('jwt', {session: false}), user.requireAdmin,thesesController.listThesesComplete);
router.get('/searchThesesComplete',thesesController.searchThesesComplete);
router.get('/getTotalTheses', passport.authenticate('jwt', {session: false}), user.requireAdmin , thesesController.getTotalTheses);

module.exports = router;