const express = require('express');
const userController = require("../controllers/user.controller");
const userValidator = require("../validators/user.validator");
const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userValidator.user, userController.addUser);
router.get('/:userId', userController.getUserByID);
router.patch('/:userId', userValidator.user, userController.updateUserByID);
router.delete('/:userId', userController.deleteUser);
router.get('/:userId/projects', userController.getUserProjects);

module.exports = router;