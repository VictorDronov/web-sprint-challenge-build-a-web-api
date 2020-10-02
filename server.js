const express = require("express");
const server = express();
const routerProjects = require("./routes/projectsRoutes");
const actionRouter = require("./routes/actionRoutes");

server.use("/projects", routerProjects);
server.use("/projects/:id", actionRouter);

server.get("/", (req, res) => {
  res.status(200).json({ data: "WORKING" });
});

module.exports = server;
