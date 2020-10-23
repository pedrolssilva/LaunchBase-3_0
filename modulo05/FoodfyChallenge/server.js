const express = require("express");
const nunjuncks = require("nunjucks");

const server = express();

server.use(express.static("public"));

server.set("view engine", "njk");

nunjuncks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get("/", function (req, res) {
  res.render("main");
});

server.get("/about", function (req, res) {
  res.render("general/about");
});

server.get("/recipes", function (req, res) {
  res.render("recipes/recipes");
});

server.listen(5000, function () {
  console.log("Server is running...");
});
