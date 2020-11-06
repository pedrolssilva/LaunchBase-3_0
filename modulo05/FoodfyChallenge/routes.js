const express = require("express");
const routes = express.Router();

const general = require("./controllers/general");
const recipes = require("./controllers/recipes");
const admin = require("./controllers/admin");

routes.get("/", function (req, res) {
  res.render("main");
});

routes.get("/about", general.show);

routes.get("/recipes", recipes.index);

routes.get("/admin/recipes", admin.index);
routes.get("/admin/recipes/create", admin.create);
routes.get("/admin/recipes/:id", admin.show);

routes.post("/admin/recipes", admin.post);

module.exports = routes;
