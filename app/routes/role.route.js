const express = require('express');
const router = express.Router();
const roleController = require('../controller/role.controller');
const user = require('../middleware/passport');
const passport = require('passport');

router.post('/addRole', roleController.addRole);
router.put('/updateRole/:id', roleController.updateRole);
router.get('/getOne/:id', roleController.getOne);
router.get('/getAll', roleController.getAll);
router.delete('/deleteOne/:id',roleController.deleteOne);
module.exports = router;