const express = require('express');
const router = express.Router();
const userController = require('../controller/student.controller');
const user = require('../middleware/passport');
const passport = require('passport');
const { uploadCSV } = require('../middleware/upload');

router.post('/addStudent', uploadCSV.single('csv'), userController.addStudent);
router.patch('/updateStudent/:id' ,userController.updateStudent);
router.get('/getOne/:id',userController.getOne);
router.get('/getAll',userController.getAll);
router.delete('/deleteOne/:id',userController.deleteStudent);
router.patch('/changePassword',passport.authenticate('jwt', {session: false}), userController.updatePassword);

module.exports = router;
//passport.authenticate('jwt', {session: false}),user.requireAdmin