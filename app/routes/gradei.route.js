const express = require('express');
const router = express.Router();
const gradeController = require('../controller/gradei.controller');
const user = require('../middleware/passport');
const passport = require('passport');
const { uploadFile } = require('../middleware/upload');
router.post('/uploadFile',passport.authenticate('jwt', {session: false}),user.requireUser, uploadFile.single('file'), gradeController.create);
router.patch('/updateOne/:id',passport.authenticate('jwt', {session: false}), user.requireTk, gradeController.updateOne);
router.get('/getOne',passport.authenticate('jwt', {session: false}),user.requireUser, gradeController.getOne);
router.get('/getAll',passport.authenticate('jwt', {session: false}), user.requireAdmin, gradeController.getAll);
router.delete('/deleteOne/:id',gradeController.deleteOne);
router.get('/downloadFile/:id',gradeController.downLoadFile);
router.get('/fileName/:id',gradeController.fileName);
module.exports = router;