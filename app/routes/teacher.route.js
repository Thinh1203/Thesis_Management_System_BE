const express = require('express');
const router = express.Router();
const userController = require('../controller/teacher.controller');
const user = require('../middleware/passport');
const passport = require('passport');
const { uploadCSV } = require('../middleware/upload');

router.post('/addTeacher', uploadCSV.single('csv'), userController.addTeacher);
router.patch('/updateTeacher/:id' ,userController.updateTeacher);
router.get('/getOne/:id',userController.getOne);
router.get('/getAll', passport.authenticate('jwt', {session: false}), user.requireAdmin ,userController.getAll);
router.patch('/changePassword/:id', userController.updatePassword);
router.delete('/deleteOne/:id',userController.deleteTeacher);

module.exports = router;
