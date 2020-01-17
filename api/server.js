const express = require("express");
const server = express();
server.use(express.json());
const projectRouter = require("./projectsRouter")


server.get("/", (req, res) => {
    res.send(`<p>hellfrom server</p`);
  });

server.use("/api/projects", projectRouter)


module.exports = server;
