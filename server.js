const express = require('express');
const userRoutes = require("./app/routes/user.route");
const projectRoutes = require("./app/routes/project.route");
const taskRoutes = require("./app/routes/task.route");

const app = new express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

const server = app.listen(process.env.PORT, '0.0.0.0', function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("server started at http://%s:%s", host, port);
})