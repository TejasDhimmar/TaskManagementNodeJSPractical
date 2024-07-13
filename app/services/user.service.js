const User = require("../models/user.model");

let users = [];

const createUser = (user) => {
    user.id = users.length + 1;
    const newUser = new User(user.id, user.name, user.email);
    users.push(newUser);
    return user;
}

const getUsers = (userId) => {
    let user = users;
    if (userId) {
        user = users.filter(data => data.id == userId);
    }
    return user;
}

const getUsersByName = (userData) => {
    let user = {};
    if (userData.id) {
        user = users.filter(data => data.name == userData.name && data.id != userData.id);
    }
    else {
        user = users.filter(data => data.name == userData.name);
    }
    return user;
}

const getUsersByEmail = (userData) => {
    let user = {};
    if (userData.id) {
        user = users.filter(data => data.email == userData.email && data.id != userData.id);
    }
    else {
        user = users.filter(data => data.email == userData.email);
    }
    return user;
}

const updateUser = (user) => {
    let userIndex = users.findIndex(data => data.id == user.id);
    if (userIndex >= 0) {
        const updateUser = new User(user.id, user.name, user.email);
        users[userIndex] = updateUser;
        return users[userIndex];
    }
    return null;
}

const deleteUser = (userId) => {
    let userIndex = users.findIndex(data => data.id == userId);
    if (userIndex >= 0) {
        users.splice(userIndex, 1);
        return userIndex;
    }
    return null;
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUsersByName,
    getUsersByEmail
}