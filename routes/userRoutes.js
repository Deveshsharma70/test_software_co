const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:userId/hasAccess/:module', userController.checkModuleAccess);
router.patch('/bulk/same', userController.bulkUpdateSame);
router.patch('/bulk/different', userController.bulkUpdateDifferent);

module.exports = router;