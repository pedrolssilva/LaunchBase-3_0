const express = require("express");
const nunjuncks = require("nunjucks");
const routes = require("./routes");
const server = express();

server.use(express.static("public"));
server.use(routes);

server.set("view engine", "njk");

nunjuncks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

// server.use(function (req, res) {
//   res.status(404).render("not-found");
// });

server.listen(5000, function () {
  console.log("Server is running");
});
