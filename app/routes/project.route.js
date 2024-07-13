const express = require('express');
const projectController = require("../controllers/project.controller");
const projectValidator = require("../validators/project.validator");
const router = express.Router();

router.get('/', projectController.getAllProjects);
router.post('/', projectValidator.project, projectController.addProject);
router.get('/:projectId', projectController.getProjectByID);
router.patch('/:projectId', projectValidator.project, projectController.updateProjectByID);
router.delete('/:projectId', projectController.deleteProject);
router.get('/:projectId/tasks', projectController.getProjectTasks);

module.exports = router