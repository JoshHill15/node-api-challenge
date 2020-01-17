const express = require("express");
const server = express();
server.use(express.json());
const projectRouter = require("./projectsRouter")
const actionsRouter = require("./actionsRouter")

server.get("/", (req, res) => {
    res.send(`<p>hellfrom server</p`);
  });

server.use("/api/projects", projectRouter)
server.use("/api/actions", actionsRouter)



module.exports = server;
