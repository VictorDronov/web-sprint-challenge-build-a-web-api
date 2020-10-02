const express = require("express");
const server = express();
const routerProjects = require("./routes/projectsRoutes");
const actionRouter = require("./routes/actionRoutes");

server.use("/projects", routerProjects);
server.use("/projects/:id", actionRouter);

server.get("/", (req, res) => {
  res.send(
    "<h2>End Points</h2> <p>GET /projects for all projects</p> <p>GET /projects/id for a certain project</p><p>Post /projects  to add a project</p><p>PUT /projects/id  to update a project</p><p>DELETE /projects/id to remove a project </p> <p>GET <b>/projects/id/actions</b> For all actions for that project</p> <p>DELETE <b>/projects/id/actions/id</b> Remove an action</p> <p>POST <b>/projects/id/actions</b> add an action</p> <p>PUT <b>/projects/id/actions</b> Update an action</p>"
  );
});

module.exports = server;
