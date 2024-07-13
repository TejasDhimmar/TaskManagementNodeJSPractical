const { response } = require("../utils/restResponse");
const userService = require("../services/user.service");
const projectService = require("../services/project.service");

const addUser = (req, res) => {
    try {
        const param = req.body;

        const userNameExist = userService.getUsersByName(param);
        if (userNameExist.length > 0) {
            return response(res, 409, userNameExist, "Name already exist.");
        }

        const userEmailExist = userService.getUsersByEmail(param);
        if (userEmailExist.length > 0) {
            return response(res, 409, userEmailExist, "Email already exist.");
        }

        const user = userService.createUser(param);
        return response(res, 201, user, "User created.");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }

}

const getAllUsers = (req, res) => {
    try {
        const allUsers = userService.getUsers();
        return response(res, 200, allUsers, "User list.");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const getUserByID = (req, res) => {
    try {
        const userID = req.params.userId;
        const user = userService.getUsers(userID);
        if (user.length == 0) {
            return response(res, 404, user, "User not exist.");
        }
        return response(res, 200, user, "User data.");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const updateUserByID = (req, res) => {
    try {
        const param = req.body;
        const userID = req.params.userId;
        param.id = userID;
        const userExist = userService.getUsers(userID);
        if (userExist.length == 0) {
            return response(res, 404, userExist, "User not exist.");
        }

        const userNameExist = userService.getUsersByName(param);
        if (userNameExist.length > 0) {
            return response(res, 409, userNameExist, "Name already exist.");
        }

        const userEmailExist = userService.getUsersByEmail(param);
        if (userEmailExist.length > 0) {
            return response(res, 409, userEmailExist, "Email already exist.");
        }

        const user = userService.updateUser(param);
        return response(res, 200, user, "User updated.");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const deleteUser = (req, res) => {
    try {
        const userID = req.params.userId;
        const userExist = userService.getUsers(userID);
        if (userExist.length == 0) {
            return response(res, 404, userExist, "User not exist.");
        }

        const projectExist = projectService.getProjectsByUserId(userID)
        if (projectExist.length > 0) {
            return response(res, 409, {}, "Project is exist for this user.");
        }

        const user = userService.deleteUser(userID);
        return response(res, 200, {}, "User deleted.");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

const getUserProjects = (req, res) => {
    try {
        const userID = req.params.userId
        const allProjects = projectService.getProjectsByUserId(userID)
        return response(res, 200, allProjects, "Project list.");
    }
    catch (e) {
        const errormsg = (typeof e === 'string') ? e : (typeof e.success !== 'undefined' && typeof e.message !== 'undefined') ? e.message : process.env.SERVER_ERROR;
        return response(res, 500, {}, errormsg);
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUserByID,
    updateUserByID,
    deleteUser,
    getUserProjects
}