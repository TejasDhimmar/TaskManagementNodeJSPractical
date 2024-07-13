const { response } = require("../utils/restResponse");
const taskService = require("../services/task.service");
const projectService = require("../services/project.service");

const addTask = (req, res) => {
    try {
        const param = req.body;

        const taskTitleExist = taskService.getTaskByTitle(param);
        if (taskTitleExist.length > 0) {
            return response(res, 409, taskTitleExist, "Title already exist.");
        }

        const project = projectService.getProjects(param.projectId);
        if (project.length == 0) {
            return response(res, 404, param, "Project not exist.");
        }

        const task = taskService.createTask(param);
        return response(res, 201, task, "Task created.");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const getAllTasks = (req, res) => {
    try {
        const allTasks = taskService.getTasks();
        return response(res, 200, allTasks, "Tasks list.");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const getTaskByID = (req, res) => {
    try {
        const taskID = req.params.taskId;
        const task = taskService.getTasks(taskID);
        if (task.length == 0) {
            return response(res, 404, task, "Task not exist.");
        }
        return response(res, 200, task, "Task data.");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const updateTaskByID = (req, res) => {
    try {
        const param = req.body;
        const taskID = req.params.taskId;
        param.id = taskID;
        const taskExist = taskService.getTasks(taskID);
        if (taskExist.length == 0) {
            return response(res, 404, taskExist, "Task not exist.");
        }
        param.createdAt = taskExist.createdAt;

        const taskTitleExist = taskService.getTaskByTitle(param);
        if (taskTitleExist.length > 0) {
            return response(res, 409, taskTitleExist, "Title already exist.");
        }

        const project = projectService.getProjects(param.projectId);
        if (project.length == 0) {
            return response(res, 404, param, "Project not exist.");
        }

        const task = taskService.updateTask(param);
        return response(res, 200, task, "Task updated.");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const deleteTask = (req, res) => {
    try {
        const taskID = req.params.taskId;
        const taskExist = taskService.getTasks(taskID);
        if (taskExist.length == 0) {
            return response(res, 404, taskExist, "Task not exist.");
        }
        const task = taskService.deleteTask(taskID);
        return response(res, 200, {}, "Task deleted.");

    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

module.exports = {
    addTask,
    getAllTasks,
    getTaskByID,
    updateTaskByID,
    deleteTask
}