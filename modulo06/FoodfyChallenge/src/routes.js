const express = require("express");
const routes = express.Router();

const general = require("./app/controllers/general");
const recipes = require("./app/controllers/recipes");
const chefs = require("./app/controllers/chefs");
const adminRecipes = require("./app/controllers/admin/recipes");
const adminChefs = require("./app/controllers/admin/chefs");

routes.get("/", function (req, res) {
  res.render("main");
});

routes.get("/about", general.show);

routes.get("/recipes", recipes.index);
routes.get("/searchRecipes", recipes.findRecipes);

routes.get("/chefs", chefs.index);

routes.get("/admin", function (req, res) {
  return res.redirect("/admin/recipes");
});

routes.get("/admin/recipes", adminRecipes.index);
routes.get("/admin/recipes/create", adminRecipes.create);
routes.get("/admin/recipes/:id", adminRecipes.show);
routes.get("/admin/recipes/:id/edit", adminRecipes.edit);
routes.post("/admin/recipes", adminRecipes.post);
routes.put("/admin/recipes", adminRecipes.put);
routes.delete("/admin/recipes/:id", adminRecipes.delete);

routes.get("/admin/chefs", adminChefs.index);
routes.get("/admin/chefs/create", adminChefs.create);
routes.get("/admin/chefs/:id", adminChefs.show);
routes.get("/admin/chefs/:id/edit", adminChefs.edit);
routes.post("/admin/chefs", adminChefs.post);
routes.put("/admin/chefs", adminChefs.put);
routes.delete("/admin/chefs/:id", adminChefs.delete);

module.exports = routes;
