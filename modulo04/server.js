const express = require("express");
const nunjuncks = require("nunjucks");

const server = express();
const videos = require("./data");

server.use(express.static("public"));

server.set("view engine", "njk");

nunjuncks.configure("views", {
  express: server,
  autoescape: false,
});

server.get("/", function (req, res) {
  const about = {
    avatar_irl:
      "https://avatars2.githubusercontent.com/u/6643122?s=400&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
    name: "Mayk Brito",
    role: "Instrutor - Rocketseat",
    description:
      'Programador full-stack, focado em trazer o melhor ensino para iniciantes em programação. Colaborador da <a target="_blank" href="https://rocketseat.com.br">Rocketseat</a> ',
    links: [
      {
        name: "GitHub",
        url: "https://github.com/maykbrito/",
      },
      {
        name: "Twitter",
        url: "https://twitter.com/maykbrito/",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/maykbrito/",
      },
    ],
  };
  return res.render("about", { about });
});

server.get("/portfolio", function (req, res) {
  return res.render("portfolio", { items: videos });
});

server.listen(5000, function () {
  console.log("Server is running");
});
