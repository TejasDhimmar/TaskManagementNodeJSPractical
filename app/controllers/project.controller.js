const { response } = require("../utils/restResponse");
const projectService = require("../services/project.service");
const userService = require("../services/user.service");
const taskService = require("../services/task.service");

const addProject = (req, res) => {
    try {
        const param = req.body;

        const projectNameExist = projectService.getProjectByName(param);
        if (projectNameExist.length > 0) {
            return response(res, 409, projectNameExist, "Name already exist.");
        }

        const user = userService.getUsers(param.userId);
        if (user.length == 0) {
            return response(res, 404, param, "User not exist.");
        }

        const project = projectService.createProject(param);
        return response(res, 201, project, "Project created.");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const getAllProjects = (req, res) => {
    try {
        const allProjects = projectService.getProjects();
        return response(res, 200, allProjects, "Projects list.");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const getProjectByID = (req, res) => {
    try {
        const projectID = req.params.projectId;
        const project = projectService.getProjects(projectID);
        if (project.length == 0) {
            return response(res, 404, project, "Project not exist.");
        }
        return response(res, 200, project, "Project data.");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const updateProjectByID = (req, res) => {
    try {
        const param = req.body;
        const projectID = req.params.projectId;
        param.id = projectID;
        const projectExist = projectService.getProjects(projectID);
        if (projectExist.length == 0) {
            return response(res, 404, projectExist, "Project not exist.");
        }

        const projectNameExist = projectService.getProjectByName(param);
        if (projectNameExist.length > 0) {
            return response(res, 409, projectNameExist, "Name already exist.");
        }

        const user = userService.getUsers(param.userId);
        if (user.length == 0) {
            return response(res, 404, param, "User not exist.");
        }

        const project = projectService.updateProject(param);
        return response(res, 200, project, "Project updated.");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const deleteProject = (req, res) => {
    try {
        const projectID = req.params.projectId;
        const projectExist = projectService.getProjects(projectID);
        if (projectExist.length == 0) {
            return response(res, 404, projectExist, "Project not exist.");
        }
        const taskExist = taskService.getTasksByProjectId(projectID)
        if (taskExist.length > 0) {
            return response(res, 409, {}, "Task is exist for this project.");
        }
        const project = projectService.deleteProject(projectID);
        return response(res, 200, {}, "Project deleted.");

    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const getProjectTasks = (req, res) => {
    try {
        const projectID = req.params.projectId
        const allTasks = taskService.getTasksByProjectId(projectID)
        return response(res, 200, allTasks, "Task list.");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

module.exports = {
    addProject,
    getAllProjects,
    getProjectByID,
    updateProjectByID,
    deleteProject,
    getProjectTasks
}