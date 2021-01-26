const express = require("express");
const routes = express.Router();

const general = require("./controllers/general");
const recipes = require("./controllers/recipes");
const adminRecipes = require("./controllers/admin/recipes");

routes.get("/", function (req, res) {
  res.render("main");
});

routes.get("/about", general.show);

routes.get("/recipes", recipes.index);

routes.get("/admin/recipes", adminRecipes.index);
routes.get("/admin/recipes/create", adminRecipes.create);
routes.get("/admin/recipes/:id", adminRecipes.show);
routes.get("/admin/recipes/:id/edit", adminRecipes.edit);

routes.post("/admin/recipes", adminRecipes.post);
routes.put("/admin/recipes", adminRecipes.put);
routes.delete("/admin/recipes/:id", adminRecipes.delete);

module.exports = routes;
