const express = require('express');
const router = express.Router();
const schoolYearController = require('../controller/schoolyear.controller');
const user = require('../middleware/passport');
const passport = require('passport');


router.post('/addYear', passport.authenticate('jwt', {session: false}), user.requireAdmin,schoolYearController.addSchoolYear);
router.patch('/updateYear/:id',passport.authenticate('jwt', {session: false}), user.requireAdmin,schoolYearController.updateSchoolYear);
router.get('/getOne/:id',passport.authenticate('jwt', {session: false}), user.requireAdmin, schoolYearController.getOne);
router.get('/getAll',passport.authenticate('jwt', {session: false}), user.requireAdmin,schoolYearController.getAll);
router.delete('/deleteOne/:id',passport.authenticate('jwt', {session: false}), user.requireAdmin,schoolYearController.deleteOne);
module.exports = router;