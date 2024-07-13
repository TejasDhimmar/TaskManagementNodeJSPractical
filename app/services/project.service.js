const Project = require("../models/project.model");

let projects = [];

const createProject = (project) => {
    project.id = projects.length + 1;
    const newProject = new Project(project.id, project.name, project.description, project.userId);
    projects.push(newProject);
    return project;
}

const getProjects = (projectId) => {
    let project = projects;
    if (projectId) {
        project = projects.filter(data => data.id == projectId);
    }
    return project;
}

const getProjectByName = (projectData) => {
    let project = {};
    if (projectData.id) {
        project = projects.filter(data => data.name == projectData.name && data.id != projectData.id);
    }
    else {
        project = projects.filter(data => data.name == projectData.name);
    }
    return project;
}

const updateProject = (project) => {
    let projectIndex = projects.findIndex(data => data.id == project.id);
    if (projectIndex >= 0) {
        const updateProject = new Project(project.id, project.name, project.description, project.userId);
        projects[projectIndex] = updateProject;
        return projects[projectIndex];
    }
    return null;
}

const deleteProject = (projectId) => {
    let projectIndex = projects.findIndex(data => data.id == projectId);
    if (projectIndex >= 0) {
        projects.splice(projectIndex, 1);
        return projectIndex;
    }
    return null;
}

const getProjectsByUserId = (userId) => {
    let project = projects;
    if (userId) {
        project = projects.filter(data => data.userId == userId);
    }
    return project;
}

module.exports = {
    createProject,
    getProjects,
    getProjectByName,
    updateProject,
    deleteProject,
    getProjectsByUserId
}