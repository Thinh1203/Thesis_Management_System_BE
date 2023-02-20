const express = require('express');
const router = express.Router();
const departmentController = require('../controller/department.controller');

router.post('/addDepartment', departmentController.add);
router.patch('/updateDepartment/:id', departmentController.update);
router.get('/getOne/:id',departmentController.getOne);
router.get('/getAll',departmentController.getAll);
router.delete('/deleteOne/:id',departmentController.deleteOne);
module.exports = router;