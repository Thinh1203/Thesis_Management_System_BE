const express = require('express');
const router = express.Router();
const pointController = require('../controller/point.controller');
const user = require('../middleware/passport');
const passport = require('passport');
const { uploadFile } = require('../middleware/upload');

router.post('/addApplication', passport.authenticate('jwt', {session: false}), user.requireUser,uploadFile.single('avatar'), pointController.addApplication);
router.patch('/updateApplication/:id',uploadFile.single('avatar'), pointController.update);
router.get('/getOne/:id', pointController.getOne);
router.get('/getAll',pointController.getAll);
router.delete('/deleteOne/:id',pointController.deleteOne);
module.exports = router;