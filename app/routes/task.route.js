const express = require('express');
const taskController = require("../controllers/task.controller");
const taskValidator = require("../validators/task.validator");
const router = express.Router();

router.get('/', taskController.getAllTasks);
router.post('/', taskValidator.task, taskController.addTask);
router.get('/:taskId', taskController.getTaskByID);
router.patch('/:taskId', taskValidator.task, taskController.updateTaskByID);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router