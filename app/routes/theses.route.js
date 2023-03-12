const express = require('express');
const router = express.Router();
const thesesController = require('../controller/theses.controller');
const user = require('../middleware/passport');
const passport = require('passport');
const { uploadFile } = require('../middleware/upload');

router.post('/addTheses', thesesController.addTheses);
router.patch('/updateTheses/:id', thesesController.updateTheses);
router.patch('/uploadFile/:id', uploadFile.single('file'), thesesController.uploadFile);
router.get('/getOne/:id', thesesController.getOne);
router.get('/getAll', thesesController.getAll);
router.delete('/deleteTheses/:id',thesesController.deleteTheses);
module.exports = router;