const Task = require("../models/task.model");
const moment = require('moment');

let tasks = [];

const createTask = (task) => {
    task.id = tasks.length + 1;
    task.createdAt = moment().format('DD-MM-YYYY hh:mm:ss');
    const newTask = new Task(task.id, task.title, task.description, task.status, task.projectId, task.createdAt);
    tasks.push(newTask);
    return task;
}

const getTasks = (taskId) => {
    let task = tasks;
    if (taskId) {
        task = tasks.filter(data => data.id == taskId);
    }
    return task;
}

const getTaskByTitle = (taskData) => {
    let task = {};
    if (taskData.id) {
        task = tasks.filter(data => data.title == taskData.title && data.id != taskData.id);
    }
    else {
        task = tasks.filter(data => data.title == taskData.title);
    }
    return task;
}

const updateTask = (task) => {
    let taskIndex = tasks.findIndex(data => data.id == task.id);
    if (taskIndex >= 0) {
        const updateTask = new Task(task.id, task.title, task.description, task.status, task.projectId, task.createdAt);
        tasks[taskIndex] = updateTask;
        return tasks[taskIndex];
    }
    return null;
}

const deleteTask = (taskId) => {
    let taskIndex = tasks.findIndex(data => data.id == taskId);
    if (taskIndex >= 0) {
        tasks.splice(taskIndex, 1);
        return taskIndex;
    }
    return null;
}

const getTasksByProjectId = (projectId) => {
    let task = tasks;
    if (projectId) {
        task = tasks.filter(data => data.projectId == projectId);
    }
    return task;
}

module.exports = {
    createTask,
    getTasks,
    getTaskByTitle,
    updateTask,
    deleteTask,
    getTasksByProjectId
}