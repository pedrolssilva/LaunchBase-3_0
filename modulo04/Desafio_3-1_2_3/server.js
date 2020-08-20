const express = require("express");
const nunjuncks = require("nunjucks");

const server = express();
const data = require("./data");

server.use(express.static("public"));

server.set("view engine", "njk");

nunjuncks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get("/", function (req, res) {
  const about = {
    avatar_irl:
      "https://avatars2.githubusercontent.com/u/6643122?s=400&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
    title: "Rocketseat",
    description:
      " As melhores tecnologias em programação, direto ao ponto e do jeito certo.",
    main_techs: ["ReactJS", "React Native", "NodeJs"],
  };
  return res.render("about", { about });
});

server.get("/courses", function (req, res) {
  return res.render("courses", { items: data });
});

server.get("/courses/:id", function (req, res) {
  const id = req.params.id;

  const course = data.find(function (course) {
    return course.id == id;
  });
  if (!course) {
    return res.send("Course not found!");
  }

  return res.render("course", { item: course });
});

server.use(function (req, res) {
  res.status(404).render("not-found");
});

server.listen(5000, function () {});
