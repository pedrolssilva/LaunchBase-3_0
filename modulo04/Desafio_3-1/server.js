const express = require("express");
const nunjuncks = require("nunjucks");

const server = express();

server.use(express.static("public"));

server.set("view engine", "njk");

nunjuncks.configure("views", {
  express: server,
});

server.get("/", function (req, res) {
  return res.render("about");
});

server.get("/contents", function (req, res) {
  return res.render("contents");
});

server.use(function (req, res) {
  res.status(404).render("not-found");
});

server.listen(5000, function () {});
