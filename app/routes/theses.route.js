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
router.get('/getAll', passport.authenticate('jwt', {session: false}), user.requireUser ,thesesController.getAll);
router.delete('/deleteTheses/:id',thesesController.deleteTheses);
router.post('/transcript/:id', thesesController.transcript)
module.exports = router;