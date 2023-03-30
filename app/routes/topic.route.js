const express = require('express');
const router = express.Router();
const topicController = require('../controller/topic.controller');
const user = require('../middleware/passport');
const passport = require('passport');
const { uploadCSV } = require('../middleware/upload');

router.post('/addTopic',uploadCSV.single('csv'), topicController.addTopic);
router.put('/updateTopic/:id', topicController.updateTopic);
router.get('/getOne/:id', topicController.getOne);
router.get('/getAll', topicController.getAll);
router.delete('/deleteTopic/:id',topicController.deleteTopic);
module.exports = router;