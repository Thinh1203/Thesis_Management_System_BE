const express = require('express');
const router = express.Router();
const thesesController = require('../controller/theses.controller');
const user = require('../middleware/passport');
const passport = require('passport');
const { uploadFile } = require('../middleware/upload');

router.post('/addTheses',passport.authenticate('jwt', {session: false}), user.requireUser, thesesController.addTheses);
router.patch('/updateTheses/:id', thesesController.updateTheses);
router.patch('/uploadFile/:id', uploadFile.single('file'), thesesController.uploadFile);
router.get('/getOne/:id', thesesController.getOne);
router.get('/getAll' ,thesesController.getAll);
router.get('/getAllListTheses' ,thesesController.getAllListTheses);
router.delete('/deleteTheses/:id',thesesController.deleteTheses);
router.post('/transcript/:id', thesesController.transcript);
router.get('/ListOfGuidedTopics',passport.authenticate('jwt', {session: false}), user.requireUser, thesesController.ListOfGuidedTopics);
router.get('/search',passport.authenticate('jwt', {session: false}), user.requireAdmin , thesesController.search);
module.exports = router;