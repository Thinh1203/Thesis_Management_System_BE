const express = require('express');
const router = express.Router();
const departmentController = require('../controller/department.controller');
const user = require('../middleware/passport');
const passport = require('passport');


router.post('/addDepartment', departmentController.addDepartment);
router.put('/updateDepartment/:id', departmentController.updateDepartment);
router.get('/getOne/:id', departmentController.getOne);
router.get('/getAll',departmentController.getAll);
router.delete('/deleteOne/:id', departmentController.deleteDepartment);
module.exports = router;