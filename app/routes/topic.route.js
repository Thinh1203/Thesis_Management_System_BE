const express = require('express');
const router = express.Router();
const topicController = require('../controller/topic.controller');
const user = require('../middleware/passport');
const passport = require('passport');
const { uploadCSV } = require('../middleware/upload');

router.post('/addTopic',passport.authenticate('jwt', {session: false}), user.requireAdmin, uploadCSV.single('csv'), topicController.addTopic);
router.patch('/updateTopic/:id',passport.authenticate('jwt', {session: false}), user.requireAdmin , topicController.updateTopic);
router.get('/getOne/:id', topicController.getOne);
router.get('/getAll', topicController.getAll);
router.get('/getListTopic',passport.authenticate('jwt', {session: false}), user.requireAdmin, topicController.getListTopic);
router.post('/uploadFile',passport.authenticate('jwt', {session: false}) , user.requireAdmin, uploadCSV.single('csv'), topicController.uploadFile);
router.delete('/deleteTopic/:id',passport.authenticate('jwt', {session: false}), user.requireAdmin, topicController.deleteTopic);
router.get('/search',passport.authenticate('jwt', {session: false}), user.requireAdmin , topicController.search);
module.exports = router;