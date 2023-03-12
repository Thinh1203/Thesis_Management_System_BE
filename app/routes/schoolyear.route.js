const express = require('express');
const router = express.Router();
const schoolYearController = require('../controller/schoolyear.controller');
const user = require('../middleware/passport');
const passport = require('passport');


router.post('/addYear',schoolYearController.addSchoolYear);
router.put('/updateYear/:id',schoolYearController.updateSchoolYear);
router.get('/getOne/:id', schoolYearController.getOne);
router.get('/getAll',schoolYearController.getAll);
router.delete('/deleteOne/:id',schoolYearController.deleteOne);
// router.post('/addYear', passport.authenticate('jwt', {session: false}), user.requireAdmin,schoolYearController.addSchoolYear);
// router.patch('/updateYear/:id',passport.authenticate('jwt', {session: false}), user.requireAdmin,schoolYearController.updateSchoolYear);
// router.get('/getOne/:id', schoolYearController.getOne);
// router.get('/getAll',schoolYearController.getAll);
// router.delete('/deleteOne/:id',passport.authenticate('jwt', {session: false}), user.requireAdmin,schoolYearController.deleteOne);
module.exports = router;